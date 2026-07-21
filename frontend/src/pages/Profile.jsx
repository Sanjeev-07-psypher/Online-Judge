import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import RecentActivity from "../components/profile/RecentActivity";

import {
  getUserProfile,
} from "../services/userService";

const Profile = () => {
  const { user } = useAuth();

  const userId =
  user?.id ||
  user?._id;

  const {
    data: profile,
    isLoading,
  } = useQuery({
    queryKey: [
      "profile",
      userId,
    ],
    queryFn: () =>
      getUserProfile(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <DashboardLayout>

      <ProfileHeader
        user={profile.user}
        rank={profile.rank}
      />

      <div className="mt-8">
        <ProfileStats
          profile={profile}
        />
      </div>

      <div className="mt-8">

        <RecentActivity
          submissions={
            profile.recentSubmissions
          }
        />

      </div>

    </DashboardLayout>
  );
};

export default Profile;