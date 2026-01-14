import { CustomHeader } from "@/components/custom-header";
import React from "react";
import { View } from "react-native";
import SelectStoreComponent from "./select-store";

export default function SelectStore() {
    return (
        <View>
            <CustomHeader
                title="Lựa chọn cửa hàng"
                subtitle="Chọn cửa hàng để bắt đầu kiểm tra"
            />
            <SelectStoreComponent />
        </View>
    );
}