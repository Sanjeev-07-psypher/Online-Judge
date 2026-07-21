import Card from "../ui/Card";

const activities = [
  {
    title: "Accepted Two Sum",
    time: "2 hours ago",
  },
  {
    title: "Solved Binary Search",
    time: "Yesterday",
  },
  {
    title: "AI Analysis Generated",
    time: "Yesterday",
  },
  {
    title: "Reached Codeforces Pupil",
    time: "3 days ago",
  },
];

const ActivityTimeline = () => {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex gap-4"
          >
            <div className="mt-1 h-3 w-3 rounded-full bg-violet-500" />

            <div>
              <p className="font-medium">
                {activity.title}
              </p>

              <p className="text-sm text-zinc-500">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ActivityTimeline;