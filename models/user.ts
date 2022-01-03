export type AuthRequest = {
  email: string;
  password: string;
};

export type UserResponse = {
  localId: string;
  idToken: string;
  expiresIn: string;
};
