import React from "react";

interface Suggestion {
    type: "good" | "improve";
    tip: string;  // <-- correct property name
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const Ats = ({ score, suggestions }: ATSProps) => {
    const gradientClass =
        score > 69
            ? "from-green-100"
            : score > 49
                ? "from-yellow-100"
                : "from-red-100";

    const iconSrc =
        score > 69
            ? "/icons/ats-good.svg"
            : score > 49
                ? "/icons/ats-warning.svg"
                : "/icons/bad.svg";

    const subtitle =
        score > 69 ? "Great Job" : score > 49 ? "Good Start" : "Needs Improvement";

    return (
        <div
            className={`bg-gradient-to-b ${gradientClass} to-white rounded-2xl shadow-md w-full p-6`}
        >
            <div className="flex items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS score icon" className="w-12 h-12" />
                <div>
                    <h2 className="text-2xl font-bold">ATS Score</h2>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{subtitle}</h3>
                <p className="text-gray-600 mb-4">
                    This score represents how well your resume is likely to perform in
                    Applicant Tracking
                </p>

                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img
                                src={
                                    suggestion.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt={suggestion.type === "good" ? "Check" : "Warning"}
                                className="w-5 h-5 mt-1"
                            />
                            <p
                                className={
                                    suggestion.type === "good"
                                        ? "text-green-700"
                                        : "text-amber-800"
                                }
                            >
                                {suggestion.tip} {/* <-- fixed from 'tips' to 'tip' */}
                            </p>
                        </div>
                    ))}
                </div>

                <div>
                    <p className="text-gray-700 italic">
                        Keep refining your resume to improve your chance
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Ats;
