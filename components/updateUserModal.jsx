import { useState } from "react";
import { decrypt } from "@/utils/crypto";
import { FaTimes, FaUser, FaEnvelope, FaVenusMars, FaUniversity, FaBookOpen, FaInfoCircle } from "react-icons/fa";

export default function UpdateUserInfoModal({ userData, onClose, onUpdate }) {
  const userId = userData._id;
  const [name, setName] = useState(decrypt(userData.name));
  const [email, setEmail] = useState(decrypt(userData.email));
  const [gender, setGender] = useState(decrypt(userData.gender));
  const [university, setUniversity] = useState(decrypt(userData.university));
  const [department, setDepartment] = useState(decrypt(userData.department));
  const [bio, setBio] = useState(decrypt(userData.bio));

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ userId, name, email, gender, university, department, bio });
    onClose();
  };

  const inputClass = "input-glass";
  const labelClass = "block text-sm font-medium text-white/70 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-strong rounded-2xl w-full max-w-lg p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </button>

        <h2 className="text-xl font-bold text-gradient mb-6">Update Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}><FaUser className="inline mr-2 text-cyan-400" />Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}><FaEnvelope className="inline mr-2 text-cyan-400" />Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}><FaVenusMars className="inline mr-2 text-cyan-400" />Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass} style={{ colorScheme: "dark" }}>
              <option value="male" className="bg-[#0d0d2b]">Male</option>
              <option value="female" className="bg-[#0d0d2b]">Female</option>
              <option value="other" className="bg-[#0d0d2b]">Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}><FaUniversity className="inline mr-2 text-cyan-400" />University</label>
            <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}><FaBookOpen className="inline mr-2 text-cyan-400" />Department</label>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}><FaInfoCircle className="inline mr-2 text-cyan-400" />Bio</label>
            <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 py-2.5">Save Changes</button>
            <button type="button" onClick={onClose} className="btn-ghost py-2.5 px-6">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
