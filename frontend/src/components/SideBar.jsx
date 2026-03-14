import React from "react";

const SideBar = ({ result }) => {
    if (
        !result ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long
    ) {
        return null;
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2">

<span className="text-xl">📌</span>
<h3 className="font-semibold text-indigo-600 text-lg">
    Quick Exam View
</h3>

            </div>
        </div>
    );
};

export default SideBar;
