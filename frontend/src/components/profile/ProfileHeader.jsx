import Card from "../ui/Card";

const ProfileHeader = ({ user, rank }) => {
  return (
    <Card>
      <div className="flex items-center gap-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-md border border-amber/40 bg-amber/10 text-3xl font-bold text-amber glow">
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="font-mono text-3xl font-bold text-ink">
            {user.username}
          </h1>

          <p className="mt-1 text-ink-dim">{user.email}</p>

          <div className="mt-4">
            <span className="rounded border border-amber/30 bg-amber/10 px-3 py-1 text-sm text-amber">
              rank #{rank}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
