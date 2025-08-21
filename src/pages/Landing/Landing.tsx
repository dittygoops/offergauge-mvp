import NavBar from "../../components/NavBar";
import Card from "../../components/Card";
import Button from "../../components/Button";
import BadgeIcon from "../../icons/BadgeIcon";
import ShieldIcon from "../../icons/ShieldIcon";
import UsersIcon from "../../icons/UsersIcon";
import CheckIcon from "../../icons/CheckIcon";

function Landing() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <NavBar />

            {/* Hero Section */}
            <div
                className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16"
                style={{ backgroundColor: "var(--color-light-beige)" }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                        OfferGauge
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
                        Instantly assess deal viability and optimize your
                        acquisition <br />
                        financing with AI-powered insights.
                    </p>
                    <Button navigate="/signup" text="Get Started" />
                </div>
            </div>

            {/* Testimonials Section */}
            <div
                className="py-16 px-4 sm:px-6 lg:px-8"
                style={{ backgroundColor: "var(--color-gray-pale)" }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-12">
                        Don't take it from us.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card
                            icon={<BadgeIcon className="w-6 h-6 text-white" />}
                            title="CPA Verified"
                            description="Our calculations and methodologies are verified by certified public accountants to ensure accuracy and compliance with industry standards."
                        />

                        <Card
                            icon={<ShieldIcon className="w-6 h-6 text-white" />}
                            title="Broker Verified"
                            description="Trusted and validated by licensed business brokers who use our platform daily for deal analysis and client presentations."
                        />

                        <Card
                            icon={<UsersIcon className="w-6 h-6 text-white" />}
                            title="Used by Leading Brokerages"
                            description="Trusted by professional firms including GILE Commercial Real Estate and GILE Healthcare Real Estate for their acquisition analysis."
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-8">
                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-16">
                        <div className="flex items-center justify-center space-x-2">
                            <CheckIcon className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 font-medium">
                                Used by 500+ firms
                            </span>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <CheckIcon className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 font-medium">
                                $2B+ deals analyzed
                            </span>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <CheckIcon className="w-5 h-5 text-green-600" />
                            <span className="text-gray-700 font-medium">
                                CPA & Broker verified
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
