import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  FiGrid, FiClock, FiHeart, FiShoppingCart,
  FiSettings, FiLogOut, FiEye, FiEyeOff, FiUpload
} from "react-icons/fi"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import "./ProfilePage.css"

const NAV_ITEMS = [
  { icon: <FiGrid size={16}/>,  label: "Dashboard",    key: "dashboard" },
  { icon: <FiClock size={16}/>, label: "Order History", key: "orders" },
  { icon: <FiHeart size={16}/>,  label: "Wishlist",      key: "wishlist" },
  { icon: <FiShoppingCart size={16}/>,label: "Shopping Cart", key: "cart" },
  { icon: <FiSettings size={16}/>, label: "Settings",      key: "settings" },
]

function ProfilePage() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("settings")

  // Account Settings
  const nameParts  = (user?.name || "").split(" ")
  const [firstName, setFirstName] = useState(nameParts[0] || "")
  const [lastName, setLastName]  = useState(nameParts.slice(1).join(" ") || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone,  setPhone] = useState(user?.phone || "")
  const [accMsg, setAccMsg] = useState("")
  const [accErr, setAccErr] = useState("")
  const [accLoading,setAccLoading]= useState(false)

  // Billing Address
  const [addr, setAddr] = useState({
    firstName: "", lastName: "", company: "",
    street: "", country: "", state: "", zip: ""
  })
  const [addrMsg,    setAddrMsg]     = useState("")
  const [addrLoading,setAddrLoading] = useState(false)

  // Change Password
  const [curPass, setCurPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confPass, setConfPass] = useState("")
  const [showCur, setShowCur] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConf, setShowConf] = useState(false)
  const [passMsg, setPassMsg] = useState("")
  const [passErr,  setPassErr] = useState("")
  const [passLoad, setPassLoad] = useState(false)

  const handleAccountSave = async (e) => {
    e.preventDefault()
    setAccLoading(true); setAccMsg(""); setAccErr("")
    try {
      const res = await api.put("/users/profile", {
        name: `${firstName} ${lastName}`.trim(),
        email, phone
      })
      login({ ...res.data, token: localStorage.getItem("token") })
      setAccMsg("Account settings saved successfully!")
    } catch (err) {
      setAccErr(err.response?.data?.message || "Something went wrong")
    } finally {
      setAccLoading(false)
    }
  }

  const handleAddrSave = async (e) => {
    e.preventDefault()
    setAddrLoading(true); setAddrMsg("")
    try {
      await api.put("/users/profile", { address: addr })
      setAddrMsg("Billing address saved successfully!")
    } catch {
      setAddrMsg("Failed to save address.")
    } finally {
      setAddrLoading(false)
    }
  }

  const handlePassChange = async (e) => {
    e.preventDefault()
    setPassMsg(""); setPassErr("")
    if (newPass !== confPass) { setPassErr("Passwords do not match"); return }
    if (newPass.length < 6)   { setPassErr("Minimum 6 characters"); return }
    setPassLoad(true)
    try {
      await api.put("/users/change-password", {
        currentPassword: curPass, newPassword: newPass
      })
      setPassMsg("Password changed successfully!")
      setCurPass(""); setNewPass(""); setConfPass("")
    } catch (err) {
      setPassErr(err.response?.data?.message || "Failed to change password")
    } finally {
      setPassLoad(false)
    }
  }

  const handleLogout = () => { logout(); navigate("/login") }

  return (
    <div className="prof-page">

      {/* Banner */}
      <div className="prof-banner">
        <div className="container prof-banner__inner">
          <span>Home</span> <span>/</span>
          <span>Account</span> <span>/</span>
          <span className="prof-banner__cur">Settings</span>
        </div>
      </div>

      <div className="container prof-body">

        {/* ── Sidebar ── */}
        <aside className="prof-sidebar">
          <p className="prof-sidebar__label">Navigation</p>
          <nav>
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                className={`prof-nav-item ${activeTab === item.key ? "prof-nav-item--active" : ""}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button className="prof-nav-item prof-nav-item--logout" onClick={handleLogout}>
              <FiLogOut size={16}/>
              <span>Log out</span>
            </button>
          </nav>
        </aside>

        {/* ── Main Content ── */}
        <main className="prof-main">

          {/* Account Settings */}
          <div className="prof-card">
            <h3 className="prof-card__title">Account Settings</h3>
            {accMsg && <div className="prof-msg prof-msg--success">{accMsg}</div>}
            {accErr && <div className="prof-msg prof-msg--error">{accErr}</div>}
            <form onSubmit={handleAccountSave}>
              <div className="prof-form-row">
                {/* Left fields */}
                <div className="prof-form-fields">
                  <div className="prof-field-row">
                    <div className="prof-field">
                      <label>First Name</label>
                      <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First name"/>
                    </div>
                    <div className="prof-field">
                      <label>Last Name</label>
                      <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last name"/>
                    </div>
                  </div>
                  <div className="prof-field">
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address"/>
                  </div>
                  <div className="prof-field">
                    <label>Phone Number</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="(000) 000-0000"/>
                  </div>
                  <button type="submit" className="prof-btn" disabled={accLoading}>
                    {accLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>

                {/* Avatar */}
                <div className="prof-avatar-wrap">
                  <div className="prof-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name}/>
                    ) : (
                      <span>{user?.name?.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <button type="button" className="prof-avatar-btn">
                    <FiUpload size={14}/> Choose Image
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Billing Address */}
          <div className="prof-card">
            <h3 className="prof-card__title">Billing Address</h3>
            {addrMsg && <div className="prof-msg prof-msg--success">{addrMsg}</div>}
            <form onSubmit={handleAddrSave}>
              <div className="prof-field-row">
                <div className="prof-field">
                  <label>First Name</label>
                  <input value={addr.firstName} onChange={e => setAddr({...addr, firstName: e.target.value})} placeholder="First Name"/>
                </div>
                <div className="prof-field">
                  <label>Last Name</label>
                  <input value={addr.lastName} onChange={e => setAddr({...addr, lastName: e.target.value})} placeholder="Last Name"/>
                </div>
                <div className="prof-field">
                  <label>Company Name <span>(Optional)</span></label>
                  <input value={addr.company} onChange={e => setAddr({...addr, company: e.target.value})} placeholder="Your Company Name"/>
                </div>
              </div>
              <div className="prof-field">
                <label>Street Address</label>
                <input value={addr.street} onChange={e => setAddr({...addr, street: e.target.value})} placeholder="Your address"/>
              </div>
              <div className="prof-field-row">
                <div className="prof-field">
                  <label>Country / Region</label>
                  <input value={addr.country} onChange={e => setAddr({...addr, country: e.target.value})} placeholder="Country"/>
                </div>
                <div className="prof-field">
                  <label>States</label>
                  <input value={addr.state} onChange={e => setAddr({...addr, state: e.target.value})} placeholder="State"/>
                </div>
                <div className="prof-field">
                  <label>Zip Code</label>
                  <input value={addr.zip} onChange={e => setAddr({...addr, zip: e.target.value})} placeholder="Zip Code"/>
                </div>
              </div>
              <button type="submit" className="prof-btn" disabled={addrLoading}>
                {addrLoading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Change Password  */}
          <div className="prof-card">
            <h3 className="prof-card__title">Change Password</h3>
            {passMsg && <div className="prof-msg prof-msg--success">{passMsg}</div>}
            {passErr && <div className="prof-msg prof-msg--error">{passErr}</div>}
            <form onSubmit={handlePassChange}>
              <div className="prof-field">
                <label>Current Password</label>
                <div className="prof-pass-wrap">
                  <input
                    type={showCur ? "text" : "password"}
                    value={curPass} onChange={e => setCurPass(e.target.value)}
                    placeholder="Password"
                  />
                  <button type="button" onClick={() => setShowCur(s => !s)}>
                    {showCur ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                  </button>
                </div>
              </div>
              <div className="prof-field-row">
                <div className="prof-field">
                  <label>New Password</label>
                  <div className="prof-pass-wrap">
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPass} onChange={e => setNewPass(e.target.value)}
                      placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowNew(s => !s)}>
                      {showNew ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                    </button>
                  </div>
                </div>
                <div className="prof-field">
                  <label>Confirm Password</label>
                  <div className="prof-pass-wrap">
                    <input
                      type={showConf ? "text" : "password"}
                      value={confPass} onChange={e => setConfPass(e.target.value)}
                      placeholder="Password"
                    />
                    <button type="button" onClick={() => setShowConf(s => !s)}>
                      {showConf ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" className="prof-btn" disabled={passLoad}>
                {passLoad ? "Changing..." : "Change Password"}
              </button>
            </form>
          </div>

        </main>
      </div>
    </div>
  )
}

export default ProfilePage