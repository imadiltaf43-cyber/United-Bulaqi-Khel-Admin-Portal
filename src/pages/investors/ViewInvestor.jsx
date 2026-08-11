import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getInvestor } from "../../services/investorService";

import { toast } from "../../utils/toast";

import {
  FaArrowLeft,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaGlobe,
  FaDollarSign,
  FaChartPie,
  FaCalendarAlt,
} from "react-icons/fa";

import "../../styles/Investors.css";

export default function ViewInvestor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [investor, setInvestor] = useState(null);

  useEffect(() => {

    loadInvestor();

  }, []);

  const loadInvestor = async () => {

    try {

      const data = await getInvestor(id);

      setInvestor(data);

    } catch {

      toast.error("Unable to load investor.");

    }

  };

  if (!investor) {

    return (

      <AdminLayout>

        <h2>Loading...</h2>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="investor-view-page">

        <div className="page-top">

          <button
            className="secondary-btn"
            onClick={() => navigate(-1)}
          >

            <FaArrowLeft />

            Back

          </button>

          <button
            className="primary-btn"
            onClick={() =>
              navigate(`/investors/edit/${investor._id}`)
            }
          >

            <FaEdit />

            Edit Investor

          </button>

        </div>

        <div className="investor-profile-card">

          <img
            src={
              investor.logo ||
              "/avatar.png"
            }
            alt=""
            className="investor-large-avatar"
          />

          <h2>{investor.fullName}</h2>

          <p>{investor.companyName}</p>

          <span
            className={`badge ${investor.status.toLowerCase()}`}
          >

            {investor.status}

          </span>

        </div>

        <div className="details-grid">

          <div className="detail-card">

            <h3>Contact Information</h3>

            <div className="detail-item">

              <FaEnvelope />

              <span>{investor.email}</span>

            </div>

            <div className="detail-item">

              <FaPhone />

              <span>{investor.phone}</span>

            </div>

            <div className="detail-item">

              <FaMapMarkerAlt />

              <span>{investor.address}</span>

            </div>

          </div>

          <div className="detail-card">

            <h3>Company Details</h3>

            <div className="detail-item">

              <FaBuilding />

              <span>{investor.companyName}</span>

            </div>

            <div className="detail-item">

              <FaGlobe />

              <span>

                {investor.city}, {investor.country}

              </span>

            </div>

            <div className="detail-item">

              <FaChartPie />

              <span>

                {investor.investmentCategory}

              </span>

            </div>

          </div>

          <div className="detail-card">

            <h3>Investment</h3>

            <div className="detail-item">

              <FaDollarSign />

              <span>

                $

                {Number(
                  investor.investmentAmount || 0
                ).toLocaleString()}

              </span>

            </div>

            <div className="detail-item">

              <FaChartPie />

              <span>

                {investor.ownershipPercentage} %

              </span>

            </div>

            <div className="detail-item">

              <FaCalendarAlt />

              <span>

                {investor.investmentDate
                  ? new Date(
                      investor.investmentDate
                    ).toLocaleDateString()
                  : "-"}

              </span>

            </div>

          </div>

        </div>

        <div className="detail-card remarks-card">

          <h3>Remarks</h3>

          <p>

            {investor.remarks || "No remarks available."}

          </p>

        </div>

      </div>

    </AdminLayout>

  );

}