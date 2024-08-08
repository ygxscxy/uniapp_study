export default function timeAgo(timestamp) {
    const now = Date.now(); // 获取当前时间的时间戳
    const past = new Date(timestamp).getTime(); // 将传入的时间戳转换为时间戳
    const diff = now - past; // 计算时间差（毫秒）

    // 计算时间差对应的单位
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneMonth = 30 * oneDay; // 简化计算，一个月大约30天
    const oneYear = 12 * oneMonth; // 简化计算，一年12个月

    if (diff < oneMinute) {
        return '1分钟';
    } else if (diff < oneHour) {
        return Math.floor(diff / oneMinute) + '分钟';
    } else if (diff < oneDay) {
        return Math.floor(diff / oneHour) + '小时';
    } else if (diff < oneMonth) {
        return Math.floor(diff / oneDay) + '天';
    } else if (diff < oneYear) {
        return Math.floor(diff / oneMonth) + '个月';
    } else {
        return null;
    }
}

// 使用示例：
// 假设有一个时间戳表示当前时间的1分钟前
// const exampleTimestamp = Date.now() - (60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：1分钟

// // 假设有一个时间戳表示当前时间的30分钟前
// exampleTimestamp = Date.now() - (30 * 60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：30分钟

// // 假设有一个时间戳表示当前时间的1小时前
// exampleTimestamp = Date.now() - (60 * 60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：1小时

// // 假设有一个时间戳表示当前时间的1天前
// exampleTimestamp = Date.now() - (24 * 60 * 60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：1天

// // 假设有一个时间戳表示当前时间的1个月前
// exampleTimestamp = Date.now() - (30 * 24 * 60 * 60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：1个月

// // 假设有一个时间戳表示当前时间的1年前
// exampleTimestamp = Date.now() - (365 * 24 * 60 * 60 * 1000);
// console.log(timeAgo(exampleTimestamp)); // 输出：null