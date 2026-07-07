/**
 * API Service wrapper.
 * Place actual production axios or fetch calls here.
 * Currently, all calls are mocked directly in the Redux store slice.
 */

export const api = {
  sendOtp: async (_phone: string): Promise<{ success: boolean }> => {
    // Placeholder implementation
    return { success: true };
  },
  verifyOtp: async (_otp: string): Promise<{ success: boolean; userExists: boolean }> => {
    // Placeholder implementation
    return { success: true, userExists: false };
  },
  register: async (_userData: { name: string; email: string; avatar: string }): Promise<{ success: boolean }> => {
    // Placeholder implementation
    return { success: true };
  }
};
