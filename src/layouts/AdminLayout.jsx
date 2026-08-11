import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";

import "./AdminLayout.css";

export default function AdminLayout({ children }) {

    const [collapsed, setCollapsed] = useState(false);

    const [mobileMenu, setMobileMenu] = useState(false);

    return (

        <div className="admin-layout">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <div
                className={
                    collapsed
                        ? "admin-main collapsed"
                        : "admin-main"
                }
            >

                <Topbar
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <main className="admin-content">

                    {children}

                </main>

            </div>

        </div>

    );

}