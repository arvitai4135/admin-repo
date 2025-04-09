// src/services/authService.js
export const loginUser = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  // Check if credentials match the allowed email and password
  if (credentials.email !== 'admin@gmail.com' || credentials.password !== 'admin@123') {
    throw new Error('Invalid email or password');
  }

  return {
    token: 'mock-token-123',
    user: { 
      name: 'Admin User', // Using a fixed name instead of credentials.name
      email: credentials.email,
      // Not returning password in the response for security reasons
    },
  };
};

export const registerUser = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    token: 'mock-token-123',
    user: { 
      name: userData.name, 
      email: userData.email 
    },
  };
};

export const fetchUserData = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    name: 'John Doe',
    email: 'john.doe@example.com',
    createdAt: new Date().toISOString(),
    plan: 'Premium',
  };
};