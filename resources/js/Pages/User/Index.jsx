import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function Dashboard({ auth, users }) {
    const [isLoading, setIsLoading] = useState(false);
    const perpage = useRef(10);

    const perpageChangeHandler = (e) => {
        perpage.current = e.target.value;
        getData();
    };

    const getData = () => {
        setIsLoading(true);
        router.get(
            route.current(),
            {
                perpage,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div>List of users</div>
                            <div className="overflow-x-auto pt-3">
                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <select
                                            className="select w-full max-w-xs"
                                            name="perpage"
                                            id="perpage"
                                            value={perpage.current}
                                            onChange={perpageChangeHandler}
                                        >
                                            <option disabled selected>
                                                10
                                            </option>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                    </div>

                                    <form className="flex justify-end gap-3 items-center">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="input input-bordered w-full max-w-xs"
                                            name="search"
                                            id="search"
                                            value={""}
                                        />
                                        <button className="btn  btn-neutral">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-4 h-4"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                                />
                                            </svg>
                                        </button>
                                    </form>
                                </div>

                                <div className="overflow-x-auto py-3">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Email verified at</th>
                                                <th>Created at</th>
                                                <th>Updated at</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isLoading ? (
                                                <tr colSpan={6}>Loading....</tr>
                                            ) : users ? (
                                                users.data.map((user) => (
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>
                                                            {user.email_verified_at ? (
                                                                user.email_verified_at
                                                            ) : (
                                                                <span className="text-red-500">
                                                                    unverified
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {user.created_at}
                                                        </td>
                                                        <td>
                                                            {user.updated_at}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <td colSpan={6}>
                                                    data not yet available
                                                </td>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex justify-between items-center py-3">
                                    <div>
                                        <p className="text-sm">
                                            Showing {users.from} to {users.to}{" "}
                                            total {users.total}
                                        </p>
                                    </div>
                                    <div className="join">
                                        {users.links.map((link, index) => {
                                            let linkClasses = [
                                                "join-item",
                                                "btn",
                                            ];

                                            if (link.url === null)
                                                linkClasses.push(
                                                    "btn-disabled"
                                                );

                                            if (link.active)
                                                linkClasses.push("btn-active");

                                            return (
                                                <Link
                                                    key={index}
                                                    as="button"
                                                    className={linkClasses.join(
                                                        " "
                                                    )}
                                                    href={link.url}
                                                    preserveScroll={true}
                                                    preserveState={true}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
