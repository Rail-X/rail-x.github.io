/*
 * @Author: Alan Li alanli62@outlook.com
 * @Date: 2026-05-02 11:56:15
 * @LastEditors: Alan Li alanli62@outlook.com
 * @LastEditTime: 2026-05-02 11:56:22
 * @FilePath: /undefined/Users/alan/Downloads/train_utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// ===== 拆分车型 =====
export function parseTrainName(input) {
    input = input.toUpperCase().trim();

    // CR400BF-A → CR400BF + A
    const match = input.match(/(CR[0-9A-Z]+)(?:-?([A-Z]+))?/);

    if (!match) {
        return { base: null, variant: null };
    }

    const base = match[1];
    const variant = match[2] || "标准";

    return { base, variant };
}


// ===== 查找车型 =====
export function findTrain(TrainData, input) {
    const { base, variant } = parseTrainName(input);

    if (!base || !TrainData[base]) {
        return null;
    }

    const train = TrainData[base];

    // 子型号不存在 → fallback
    const finalVariant = train.variants[variant]
        ? variant
        : "标准";

    return {
        base,
        variant: finalVariant,
        data: train.variants[finalVariant],
        baseInfo: train.base
    };
}