// src/modules/finance/fixed_assets/pages/AssetCategoryFormPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AssetCategoryForm from "../components/forms/AssetCategoryForm";
import { HeaderPage } from "@/core/ui/components";
import {
    createAssetCategory,
    getAssetCategoryDetail,
    updateAssetCategory,
} from "../api/assetCategory.api";

export default function AssetCategoryFormPage() {
    const navigate = useNavigate();
    const { categoryId } = useParams();

    const [initialValues, setInitialValues] = useState<any>(null);
    const isEdit = Boolean(categoryId);

    useEffect(() => {
        if (categoryId) {
            getAssetCategoryDetail(categoryId).then(setInitialValues);
        }
    }, [categoryId]);

    async function handleSubmit(data: any) {
        if (isEdit && categoryId) {
            await updateAssetCategory(categoryId, data);
        } else {
            await createAssetCategory(data);
        }

        navigate("/finance/fixed-assets/categories");
    }

    return (
        <>
            <HeaderPage
                title="Create Asset Category"
                subtitle="Setup depreciation and accounting configuration."
            />

            <div className="space-y-4 p-4">
                <AssetCategoryForm initialValues={initialValues} onSubmit={handleSubmit} />
            </div>
        </>
    );
}
