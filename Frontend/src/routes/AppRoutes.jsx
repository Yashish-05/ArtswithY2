import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
// import Community from "../pages/Community/Community";
import ChallengeArena from "../pages/ChallengeArena/ChallengeArena";
import Museum from "../pages/Museum/Museum";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";
import NotFound from "../pages/NotFound/NotFound";
import ArtworkDetails from "../pages/ArtworkDetails/ArtworkDetails";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import Results from "../pages/Results/Results";
import HallOfFame from "../pages/HallOfFame/HallOfFame";
import MyArtworks from "../pages/MyArtworks/MyArtworks";
import UploadArtwork from "../pages/UploadArtwork/UploadArtwork";
import Submission from "../pages/Submission/Submission";
import ChallengeGallery from "../pages/ChallengeGallery/ChallengeGallery";
import CreateChallenge from "../pages/CreateChallenge/CreateChallenge";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/community" element={<Community />} /> */}
        <Route path="/arena" element={<ChallengeArena />} />
        <Route path="/museum" element={<Museum />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/artworks/:id" element={<ArtworkDetails />} />
        <Route path="/results/:challengeId" element={<Results />} />
        <Route path="/hall-of-fame" element={<HallOfFame />} />
        <Route path="/gallery/:challengeId" element={<ChallengeGallery />} />
      </Route>
      {/* Standalone Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp"element={<VerifyOTP />}/>
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin"element={<ProtectedRoute allowedRoles={["admin"]}><Admin /></ProtectedRoute>}/>
      <Route path="/admin/create-challenge"element={<ProtectedRoute allowedRoles={["admin"]}><CreateChallenge /></ProtectedRoute>}/>
      <Route path="/my-artworks" element={<ProtectedRoute><MyArtworks /></ProtectedRoute>} />
      <Route path="/upload-artwork" element={<ProtectedRoute><UploadArtwork /></ProtectedRoute>} />
      <Route path="/submission/:challengeId" element={<ProtectedRoute><Submission /></ProtectedRoute>} />
      <Route path="/leaderboard/:challengeId" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;