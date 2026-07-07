import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { registerUser, clearError } from '../../redux/auth/authSlice';
import PageContainer from '../../components/ui/PageContainer';
import Card from '../../components/ui/Card';
import Logo from '../../components/common/Logo';
import SectionTitle from '../../components/ui/SectionTitle';
import Input from '../../components/ui/Input';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import ErrorMessage from '../../components/ui/ErrorMessage';

interface RegistrationFormValues {
  name: string;
  email: string;
  avatar: string;
}

export const Registration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { phone, loading, error: reduxError, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      name: '',
      email: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150', // Default preset
    },
  });

  // Guard: Redirect back to login if phone number is missing
  useEffect(() => {
    if (!phone) {
      navigate('/');
    }
  }, [phone, navigate]);

  // Clear errors when mounting
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegistrationFormValues) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      navigate('/home');
    }
  };

  return (
    <PageContainer>
      <div className="w-full max-w-md flex flex-col space-y-6">
        {/* App Logo */}
        <Logo size="lg" />

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
            {/* Header Title */}
            <SectionTitle
              title="Create Profile"
              subtitle="Please complete your profile details to finish signing up."
            />

            {/* Error Message Area */}
            <ErrorMessage message={reduxError} />

            {/* Profile Avatar Selector */}
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <Avatar
                  value={field.value}
                  onChange={(url) => setValue('avatar', url)}
                  disabled={loading}
                />
              )}
            />

            {/* Name Input */}
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. John Doe"
              disabled={loading}
              error={errors.name?.message}
              {...register('name', {
                required: 'Full name is required.',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters.',
                },
              })}
            />

            {/* Email Input */}
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. john.doe@example.com"
              disabled={loading}
              error={errors.email?.message}
              {...register('email', {
                required: 'Email address is required.',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address.',
                },
              })}
            />

            {/* Read-only Phone Number Input */}
            <Input
              label="Phone Number (Verified)"
              type="text"
              value={phone ? `+91 ${phone}` : ''}
              readOnly
              disabled
              className="bg-slate-100 text-slate-500 font-semibold border-slate-200 cursor-not-allowed select-none"
            />

            {/* Submit Register Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full py-3.5 mt-2"
            >
              Complete Registration
            </Button>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
};

export default Registration;
