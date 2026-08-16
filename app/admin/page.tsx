'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import GuestForm from '@/components/admin/GuestForm';
import GuestList from '@/components/admin/GuestList';
import RSVPStats from '@/components/admin/RSVPStats';
import Button from '@/components/ui/Button';
import type { Guest } from '@/types';
import { generateSlug, determineGuestType } from '@/lib/utils';

/**
 * Panel Administrativo
 * Gestión de invitados, RSVP y configuración
 */
export default function AdminPage() {
  const configuredAdminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [sessionAdminPassword, setSessionAdminPassword] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    declined: 0,
    totalGuests: 0,
    guestsConfirmed: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | undefined>();
  const [authError, setAuthError] = useState('');

  // Autenticación
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setAuthError('Debes ingresar una contraseña');
      return;
    }

    // Si existe contraseña pública configurada, se usa como validación temprana de UX.
    if (configuredAdminPassword && password !== configuredAdminPassword) {
      setAuthError('Contraseña incorrecta');
      return;
    }

    if (password) {
      setIsAuthenticated(true);
      setSessionAdminPassword(password);
      setPassword('');
      setAuthError('');
      loadGuests();
    }
  };

  // Cargar invitados
  const loadGuests = async () => {
    try {
      // En una app real, esto sería un endpoint GET /api/guests
      // Por ahora, usamos una BD ficticia que se cargaría del servidor
      const response = await fetch('/api/guests');
      if (response.ok) {
        const data = await response.json();
        setGuests(data.data || []);
        loadStats();
      } else if (response.status === 401) {
        setIsAuthenticated(false);
        setSessionAdminPassword('');
        setAuthError('Tu sesión expiro. Ingresa la contraseña nuevamente.');
      }
    } catch (error) {
      console.error('Error loading guests:', error);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const response = await fetch('/api/guests/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  // Crear o actualizar invitado
  const handleSaveGuest = async (data: {
    name: string;
    numberOfGuests: number;
  }) => {
    const slug = generateSlug(data.name);
    const guestType = determineGuestType(data.numberOfGuests);

    try {
      const endpoint = editingGuest
        ? `/api/guests/by-id/${editingGuest.id}`
        : '/api/guests';
      const method = editingGuest ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': sessionAdminPassword,
        },
        body: JSON.stringify({
          name: data.name,
          slug: editingGuest ? editingGuest.slug : slug,
          numberOfGuests: data.numberOfGuests,
          guestType,
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          setSessionAdminPassword('');
          setAuthError('Contraseña de administrador inválida o desactualizada.');
        }
        throw new Error('Error al guardar invitado');
      }

      setShowForm(false);
      setEditingGuest(undefined);
      await loadGuests();
    } catch (error) {
      throw error;
    }
  };

  // Eliminar invitado
  const handleDeleteGuest = async (guestId: string) => {
    try {
      const response = await fetch(`/api/guests/by-id/${guestId}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': sessionAdminPassword,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          setSessionAdminPassword('');
          setAuthError('Contraseña de administrador inválida o desactualizada.');
        }
        throw new Error('Error al eliminar invitado');
      }

      await loadGuests();
    } catch (error) {
      throw error;
    }
  };

  // Pantalla de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-magic-dark flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-magic-navy/40 border border-magic-gold/30 rounded-lg p-8">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🔐</div>
              <h1 className="text-3xl font-display font-bold text-magic-gold">
                Panel Admin
              </h1>
              <p className="text-magic-parchment/70 mt-2">
                Acceso restringido
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-magic-parchment font-semibold mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa la contraseña"
                  className="w-full bg-magic-dark border border-magic-gold/30 rounded-lg px-4 py-2 text-magic-parchment placeholder-magic-parchment/40 focus:border-magic-gold focus:outline-none"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="bg-magic-red/20 border border-magic-red rounded-lg p-3">
                  <p className="text-magic-red text-sm">{authError}</p>
                </div>
              )}

              <Button type="submit" variant="primary" className="w-full">
                Ingresar
              </Button>
            </form>

            <p className="text-magic-parchment/50 text-xs text-center mt-6">
              Esta sección es solo para administradores
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  // Panel admin
  return (
    <motion.div className="space-y-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Encabezado con botón nuevo */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-display font-bold text-magic-gold mb-2">
            Gestión de Invitados
          </h1>
          <p className="text-magic-parchment/70">
            Administra los invitados y confirma sus asistencias
          </p>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            setEditingGuest(undefined);
            setShowForm(true);
          }}
          disabled={showForm}
        >
          Nuevo Invitado
        </Button>
      </div>

      {/* Formulario (si está visible) */}
      {showForm && (
        <GuestForm
          guest={editingGuest}
          onSubmit={handleSaveGuest}
          onCancel={() => {
            setShowForm(false);
            setEditingGuest(undefined);
          }}
        />
      )}

      {/* Estadísticas */}
      <RSVPStats {...stats} />

      {/* Lista de invitados */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-2xl font-display font-bold text-magic-gold mb-6">
          📋 Invitados ({guests.length})
        </h2>
        <GuestList
          guests={guests}
          onEdit={(guest) => {
            setEditingGuest(guest);
            setShowForm(true);
          }}
          onDelete={handleDeleteGuest}
          onRefresh={loadGuests}
        />
      </motion.div>
    </motion.div>
  );
}
