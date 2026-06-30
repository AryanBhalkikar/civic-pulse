import { useState, useEffect } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../config/api';
import './AdminDashboard.css';

function AdminDashboard(){

    const [emailsList, setEmailsList] = useState([]);
    const [actioned, setActioned] = useState([]);

    useEffect(() => {
        async function fetchData(){
            try{
                const response = await axios.get(
                    getApiUrl('/api/admin/emailsDisplay'),
                    { withCredentials: true }
                );
                setEmailsList(response.data);
            }
            catch(err){
                alert(err.response?.data?.message || "Fetch failed");
            }
        }
        fetchData();
    }, []);

    async function handleApprove(id) {
        try{
            const response = await axios.post(
                getApiUrl(`/api/admin/emailsDisplay/${id}/approve`),
                {},
                { withCredentials: true }
            );
            if (response.status === 200){
                alert('Approval successful!');
                setActioned(prev => ({ ...prev, [id]: 'approved' }));
            }
        }
        catch(err){
            alert(err.response?.data?.message || "Approve failed");
        }
    }

    async function handleReject(id) {
        try{
            const response = await axios.post(
                getApiUrl(`/api/admin/emailsDisplay/${id}/reject`),
                {},
                { withCredentials: true }
            );
            if (response.status === 200){
                alert('Rejection successful!');
                setActioned(prev => ({ ...prev, [id]: 'rejected' }));
            }
        }
        catch(err){
            alert(err.response?.data?.message || "Reject failed");
        }
    }

    return (
        <div className="admin-page">

            <div className="admin-topbar">
                <div className="admin-logo">
                    <div className="admin-logo-dot"></div>
                    <span>CivicPulse</span>
                </div>
                <span className="admin-topbar-label">Admin dashboard</span>
            </div>

            <div className="admin-body">

                <div className="admin-sidebar">
                    <div className="admin-nav-item active">Pending emails</div>
                    <div className="admin-sidebar-count-row">
                        <span>Awaiting review</span>
                        <span className="count-badge">{emailsList.length}</span>
                    </div>
                </div>

                <div className="admin-main">

                    <div className="admin-main-header">
                        <h1 className="admin-main-title">Pending email drafts</h1>
                        <span className="admin-main-sub">
                            Review AI-generated grievance emails before they are sent.
                        </span>
                    </div>

                    {emailsList.length === 0 && (
                        <div className="admin-empty">No pending emails. You are all caught up.</div>
                    )}

                    <div className="admin-list">
                        {emailsList.map(email => (
                            <div key={email.id} className="admin-email-card">

                                <div className="admin-card-header">
                                    <span className="admin-card-to">To: {email.email_address}</span>
                                    <span className="admin-card-date">
                                        {new Date(email.created_at).toLocaleDateString('en-IN', {
                                            day: 'numeric', month: 'short', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>

                                <div className="admin-card-subject">{email.email_subject}</div>

                                <div className="admin-card-body">{email.email_body}</div>

                                <div className="admin-card-actions">
                                    {actioned[email.id] ? (
                                        <span className={`admin-actioned-label ${actioned[email.id] === 'approved' ? 'label-approved' : 'label-rejected'}`}>
                                            {actioned[email.id] === 'approved' ? 'Approved' : 'Rejected'}
                                        </span>
                                    ) : (
                                        <>
                                            <button
                                                className="btn-reject"
                                                onClick={() => handleReject(email.id)}
                                            >
                                                Reject
                                            </button>
                                            <button
                                                className="btn-approve"
                                                onClick={() => handleApprove(email.id)}
                                            >
                                                Approve and send
                                            </button>
                                        </>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;