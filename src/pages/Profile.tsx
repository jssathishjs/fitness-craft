
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProfileSection } from '@/components/profile/ProfileSection';

const Profile = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <section className="pt-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2 animate-fade-in">Your Profile</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl animate-fade-in stagger-delay-1">
            Manage your personal information, track your achievements, and customize your fitness journey.
          </p>
        </section>

        <section>
          <ProfileSection />
        </section>
      </div>
    </Layout>
  );
};

export default Profile;
