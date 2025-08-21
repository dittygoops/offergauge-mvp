import NavBar from "../../components/NavBar";

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <NavBar />
            
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Dashboard
                    </h2>
                    <p className="text-gray-600">Welcome to your dashboard!</p>
                </div>
            </main>
        </div>
    );
}

export default Home;
