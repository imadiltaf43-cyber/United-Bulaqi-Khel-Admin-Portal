export default function StatusBadge({ status }) {

    return (

        <span
            className={
                status === "Published"
                    ? "badge bg-success"
                    : "badge bg-secondary"
            }
        >

            {status}

        </span>

    );

}