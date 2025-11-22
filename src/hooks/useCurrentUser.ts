import { useState, useEffect } from 'react';

export interface CurrentUser {
    ownerId: number;
    vehicleId: string;
    vehicleNumber: string;
    mobileNumber: string;
}

export function useCurrentUser() {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('scanmycar_user');
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Failed to load user from localStorage', error);
        } finally {
            setLoading(false);
        }
    }, []);

    return { user, loading };
}
