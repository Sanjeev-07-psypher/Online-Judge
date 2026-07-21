import Card from "../ui/Card";
import VerdictBadge from "../submission/VerdictBadge";

const RecentActivity = ({
  submissions,
}) => {
  return (
    <Card>

      <h2 className="mb-6 text-xl font-semibold">
        Recent Submissions
      </h2>

      <div className="space-y-4">

        {submissions.map(
          (submission) => (
            <div
              key={submission._id}
              className="
                flex
                items-center
                justify-between
                rounded
                bg-zinc-900
                p-4
              "
            >

              <div>

                <p className="font-medium">
                  {
                    submission.problem
                      ?.title
                  }
                </p>

                <p className="mt-1 text-sm text-zinc-500">
                  {
                    submission.language
                  }
                </p>

              </div>

              <VerdictBadge
                verdict={
                  submission.verdict
                }
              />

            </div>
          )
        )}

      </div>

    </Card>
  );
};

export default RecentActivity;