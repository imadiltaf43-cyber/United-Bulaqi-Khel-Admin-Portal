import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function InvestorTable({

  investors,

  onDelete,

}) {

  //--------------------------------------------

  if (!investors.length) {

    return (

      <div className="card shadow-sm border-0">

        <div className="card-body text-center py-5">

          <h5>No Investors Found</h5>

        </div>

      </div>

    );

  }

  //--------------------------------------------

  return (

    <div className="card shadow-sm border-0">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead>

            <tr>

              <th>Guardian Name</th>

              <th>Kandy</th>

              <th>Village</th>

              <th>Shares</th>

              <th>Remarks</th>

              <th width="150">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              investors.map((investor)=>(

                <tr key={investor._id}>

                  <td>

                    <strong>

                      {investor.guardianName}

                    </strong>

                  </td>

                  <td>

                    {investor.kandy}

                  </td>

                  <td>

                    <span className={`badge ${

                      investor.village === "Barkali"

                      ? "bg-success"

                      : "bg-primary"

                    }`}>

                      {investor.village}

                    </span>

                  </td>

                  <td>

                    <strong>

                      {investor.shares}

                    </strong>

                  </td>

                  <td>

                    {investor.remarks || "-"}

                  </td>

                  <td>

                    <div className="d-flex gap-2">

                      <Link

                        to={`/investors/edit/${investor._id}`}

                        className="btn btn-sm btn-warning"

                      >

                        <FaEdit/>

                      </Link>

                      <button

                        className="btn btn-sm btn-danger"

                        onClick={()=>

                          onDelete(investor._id)

                        }

                      >

                        <FaTrash/>

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}