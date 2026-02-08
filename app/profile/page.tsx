import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="card bg-base-100 shadow-xl lg:col-span-1">
            <div className="card-body items-center text-center">
              <div className="avatar mb-4">
                <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Avatar" />
                </div>
              </div>
              <h2 className="card-title">Hernan Casasola</h2>
              <p className="text-base-content/60">Entrepreneur</p>
              <div className="divider"></div>
              <div className="w-full space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Email:</span>
                  <span>hernan@example.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Company:</span>
                  <span className="badge badge-ghost">None registered</span>
                </div>
              </div>
              <div className="card-actions mt-6">
                <button className="btn btn-primary btn-sm btn-block">Edit Profile</button>
              </div>
            </div>
          </div>

          {/* Activity/Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="stats shadow w-full">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Current Phase</div>
                <div className="stat-value text-primary font-bold">Incorporation</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title">Status</div>
                <div className="stat-value text-secondary">In Progress</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mb-4">Past Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-mono text-xs">#STR-9432</td>
                        <td className="font-semibold">US Incorporation</td>
                        <td>$599.00</td>
                        <td><span className="badge badge-success">Paid</span></td>
                        <td className="text-xs opacity-60">2026-02-07</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Empty State example */}
                {/* <div className="text-center py-12 opacity-40">No transactions found</div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
