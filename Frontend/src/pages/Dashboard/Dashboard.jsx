import Sidebar from "../../components/Dashboard/Sidebar/Sidebar";
import Topbar from "../../components/Dashboard/Topbar/Topbar";
import Stats from "../../components/Dashboard/Stats/Stats";
import useDashboard from "../../hooks/useDashboard";
import Loader from "../../components/UI/Loader/Loader";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import PageHeader from "../../components/UI/PageHeader/PageHeader";
import RecentArtworks from "../../components/Dashboard/RecentArtworks/RecentArtworks";
import ActiveChallenge from "../../components/Dashboard/ActiveChallenge/ActiveChallenge";

import "./Dashboard.css";

const Dashboard = () => {
    const { dashboard, loading, error } = useDashboard();
    if (loading) {
        return <Loader text="Loading ..." />;
    }
    if (error) {
        return <ErrorMessage message={error} />
    }
    
    const statsData = dashboard?.stats;
    return (
        <div className="dashboard">
            <Sidebar />
            <main className="dashboard-content">
                <Topbar />

<PageHeader
    title="Dashboard"
    subtitle="Manage your artworks, challenges, and profile."
/>

<Stats data={statsData} />
               <RecentArtworks
    artworks={dashboard?.recentArtworks || []}
/>
               <ActiveChallenge
    challenge={dashboard?.activeChallenge}
/>
            </main>
        </div>
    );
};
export default Dashboard;

