export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionTier: 'free' | 'pro' | 'enterprise';
}

export const MOCK_USER: User = {
    id: 'user_123',
    name: 'Ted (Banana Client)',
    email: 'ted@bananacontext.com',
    subscriptionTier: 'free',
};

export async function getUser(): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_USER;
}
