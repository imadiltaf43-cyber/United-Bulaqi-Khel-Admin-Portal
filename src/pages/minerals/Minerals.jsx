import { useMemo, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import PageHeader from "../../components/common/PageHeader";
import TableToolbar from "../../components/common/TableToolbar";
import MineralTable from "../../components/minerals/MineralTable";

import useMinerals from "../../hooks/useMinerals";

export default function Minerals() {
  const { minerals, loading, refresh } = useMinerals();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const filteredMinerals = useMemo(() => {
    return minerals.filter((mineral) => {
      const matchesSearch =
        mineral.name?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        !category || mineral.category === category;

      const matchesStatus =
        !status || mineral.status === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [minerals, search, category, status]);

  return (
    <AdminLayout>

      <PageHeader
        title="Minerals"
        subtitle="Manage all minerals displayed on the website."
        buttonText="+ Add Mineral"
        buttonLink="/minerals/add"
      />

      <TableToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        status={status}
        setStatus={setStatus}
        total={filteredMinerals.length}
      />

      <div className="card border-0 shadow-sm rounded-4">

        <div className="card-body">

          <MineralTable
            minerals={filteredMinerals}
            loading={loading}
            refresh={refresh}
          />

        </div>

      </div>

    </AdminLayout>
  );
}