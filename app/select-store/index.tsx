import { CustomHeader } from "@/components/custom-header";
import SelectStoreComponent from "@/components/select-store-component";
import React from "react";
import { View } from "react-native";

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