import type { Dict } from "./types";

export const zh: Dict = {
  locale: "zh",

  nav: [
    { label: "财富增值", section: "intro" },
    { label: "数字黄金", section: "products" },
    { label: "资讯", section: "market" },
    { label: "公司", section: "contact" },
  ],

  common: {
    menu: "菜单",
    close: "关闭",
    langSwitchLabel: "选择语言",
    skipToContent: "跳至主要内容",
  },

  home: {
    metaTitle: "DDSM — 让实物黄金变得简单",
    metaDescription:
      "通过同一个平台买入、储蓄、卖出并提取 99.99% 认证黄金。价格透明，仓储投保，随时可提取实物。",
    hero: {
      title: "为纯金而建，为你而守",
      lead: "金库中的实物金条与数字持仓，无缝相连",
      primary: "立即投资",
      secondary: "了解金库安全",
    },
    ticker: {
      label: "今日金价",
      buy: "买入",
      unavailable: "暂无价格",
    },
    intro: {
      eyebrow: "100% 足额分配实物黄金 · 即时数字化交易",
      heading: "实物黄金与数字黄金，一处尽在掌握",
      sideHeading: "打造更稳固的财务基础，今天就开启你的黄金储蓄之旅。",
      body: "PT Duta Dana Sukses Makmur 正在改变印尼人获取与管理黄金的方式。作为数字化零售交易平台，我们把高纯度黄金的可靠性与现代技术的灵活性结合在一起。通过一个整合的平台，客户可以便捷、安全、透明地买入、储蓄、卖出并提取黄金。",
    },
    bento: {
      certified: {
        title: "认证实物黄金，全程保障",
        desc: "纯度经过验证，实物所有权确实登记在你名下。",
      },
      rates: {
        title: "透明的实时金价",
        desc: "金价实时更新，全程公开透明。",
      },
      compliant: {
        title: "持牌合规，监管严格",
        desc: "受严格监管，为你的投资提供充分的法律保护。",
      },
      legacy: {
        title: "传承资产保障",
        desc: "确保你的黄金安全存放，并能直接传给挚爱的家人。",
      },
      cta: {
        title: "你的黄金之旅从这里开始",
        desc: "买入、卖出与投资黄金，更简单的方式。",
      },
    },
    market: {
      eyebrow: "实时价格",
      heading: "市场行情",
      lead: "价格在交易时段内持续更新。你可以随时锁定想要的规格。",
      cols: ["规格", "买入价", "库存"],
      available: "有货",
      soldOut: "售罄",
      updated: "更新于 {time}（西印尼时间）",
      unavailable: "暂时无法加载价格数据，请稍后再试。",
    },
    contact: {
      heading: "给我们留言",
      lead: "有疑问或遇到问题？请通过此表单告诉我们。如果是投诉，请留下电话与邮箱，方便我们直接跟进。",
      fields: {
        name: "姓名",
        namePh: "请填写你的姓名",
        email: "邮箱",
        emailPh: "请填写你的邮箱",
        phone: "电话号码",
        phonePh: "请填写你的电话号码",
        category: "咨询类别",
        categoryPh: "请选择咨询目的",
        message: "留言",
        messagePh: "请输入你的留言",
        consent: "我同意隐私政策。",
        submit: "发送",
      },
      categories: {
        purchase: "购买黄金",
        storage: "黄金保管",
        account: "账户支持",
        withdrawal: "提取实物",
        other: "其他",
      },
      status: {
        sending: "发送中…",
        successTitle: "留言已发送",
        successBody: "感谢你的留言，我们的团队会尽快与你联系。",
        hint: "请填写所有带 * 的项目后再发送。",
        invalid: "请检查标出的内容后重试。",
        error: "暂时无法发送你的留言。请稍后再试，或直接发送邮件给我们。",
      },
      errors: {
        required: "此项为必填。",
        email: "邮箱格式不正确，例如 name@email.com",
        phone: "请输入有效的电话号码：8–15 位数字，可以 + 开头。",
        category: "请选择一个类别。",
        consent: "请勾选同意隐私政策后继续。",
        tooLong: "内容过长。",
      },
    },
  },

  footer: {
    address: "Plaza Mutiara Lantai 6, Jalan Doktor Ide Anak Agung Gde Agung Kavling E.1.2 nomor 1 dan 2(dahulu jalan Lingkar Mega Kuningan), Desa/ Kelurahan Kuningan Timur, Kec.Setiabudi, Kota Adm.Jakarta Selatan, Provinsi DKI Jakarta",
    email: "corporate@dutadanasuksesmakmur.com",
    phone: "客服热线 14045",
    disclaimer:
      "PT Duta Dana Sukses Makmur 是一家从事数字黄金交易及相关服务的公司。关于公司已在 BAPPEBTI 注册、持牌并受其监管的声明，以及适用的牌照编号和通信与数字部登记信息，须在发布前经法务/合规部门确认。",
    licence: "BAPPEBTI 牌照编号：[待确认]",
    rights: "© 2026 PT Duta Dana Sukses Makmur.",
  },
};
