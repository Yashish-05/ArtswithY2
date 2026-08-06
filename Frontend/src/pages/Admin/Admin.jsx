import { useState } from "react";

import DashboardHero from "../../components/Admin/DashboardHero/DashboardHero";
import StatsCards from "../../components/Admin/StatsCards/StatsCards";
import AdminQuickActions from "../../components/Admin/AdminQuickActions/AdminQuickActions";
import ChallengeTable from "../../components/Admin/ChallengeTable/ChallengeTable";
import CreateChallenge from "../CreateChallenge/CreateChallenge";
import ChallengeDetails from "../../components/Admin/ChallengeDetails/ChallengeDetails";
import useChallenges from "../../hooks/useChallenge";
import useDashboardStats from "../../hooks/useDashboardStats";

import "./Admin.css";

const Admin = () => {
const {challenges,loading,fetchChallenges,} = useChallenges();
const {stats,fetchStats,} = useDashboardStats();
  const [activeSection, setActiveSection] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  return (

    <div className="admin-page">

      <DashboardHero />

<StatsCards
    stats={stats}
/>
      <AdminQuickActions
        onSelect={setActiveSection}
      />
      {
        activeSection === "create" && (
          <CreateChallenge
    onCreated={fetchChallenges}
/>
        )
      }
      <ChallengeTable
    challenges={challenges}
    loading={loading}
    onSelectChallenge={setSelectedChallenge}
    onSelectAction={setActiveSection}
/>
    {
    selectedChallenge && (

        <ChallengeDetails
    challenge={selectedChallenge}
    refreshChallenges={fetchChallenges}
/>

    )
}
    </div>
  );
};
export default Admin;