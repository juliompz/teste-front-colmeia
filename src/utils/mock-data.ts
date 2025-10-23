import { IProduct } from "@/@types/IProduct";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const productImages = {
  Mochila: {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/1/78f9fa3b_c793_472a_b183_e32495033da2.jpg",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/1/dacd9927_7287_4b14_a94f_b3f18c9c4d15.jpg",
    ],
  },
  "Meia Alta": {
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/2/52c14d96_66fb_4b5e_b8a9_6b6cf21fb448.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/2/b38172d0_067a_4f03_975d_3c1c10cfc5f4.jpg",
    ],
  },
  "Boné Nocta": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/41f38755_76ea_4630_ba49_59991c345513.jpg",
    ],
    Vinho: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/7a8c684b_9373_41aa_879a_c5ec99885b7a.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/3/9bb87d7b_b388_42d8_b5ca_7761804d24f7.jpg",
    ],
  },
  "Boné Curvo": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/6f6b54d9_f06d_47da_b34a_0641a5e34fa4.jpg",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/9a1a09d7_4499_4968_9b22_e95200434631.png",
    ],
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/4/ca47bcd5_e418_422d_b85c_45d8245aed03.jpg",
    ],
  },
  "Shorts Active": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/2bd85c0d_d637_49f3_bc35_c6c7c0062b5f.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/57208a2b_6dda_4f46_a856_dd1b90d7432d.png",
    ],
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/1/91674907_139b_41b1_95fa_3e570d4376f1.jpg",
    ],
  },
  "Shorts Core": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/6120253a_d8b3_453b_a0b5_3ca783ae9510.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/a5562ec7_e37a_49db_911b_26dd787463ab.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/2/e067a9e3_f9b4_4d81_8129_c90effc1038b.jpg",
    ],
  },
  "Shorts Challenger": {
    Marrom: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/78253172_fe17_4add_b597_88c689a2af3f.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/b8bf902f_de19_4ad9_bea8_87aa4d1f5679.webp",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/3/eda6b80f_1fba_4934_a242_0cd93b401677.jpg",
    ],
  },
  "Bermuda Premier": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/7a8d5bd9_0de8_4247_9374_aadce84042ea.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/a277cf75_a377_4557_bb70_ef155651338e.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Bermuda+%26+Shorts/4/a7948f93_42ac_4363_92a7_e2b3f7754230.jpg",
    ],
  },
  "Calça Nike Club": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/1cef0dc4_e296_4809_94b6_66cb3164aa43.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/611af69f_d7e7_4365_83a8_3aca96922d87.jpg",
    ],
    Vinho: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/1/e4d6bfa8_88b0_484e_8e07_5f5fc5e5cfbb.jpg",
    ],
  },
  "Calça Knit": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/3e90bb34_eb11_4cc0_930a_f1a4dcb5a4a1.png",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/d2766b69_177e_4c1d_abfe_93bb92c502f6.png",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/2/e5b271dd_1696_4ff0_8cc9_649b45ef2c88.jpg",
    ],
  },
  "Calça Brooklin": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/18a2f43f_a0bb_4d7e_a626_27c2f3b58017.jpg",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/18a2f43f_a0bb_4d7e_a626_27c2f3b58017.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/3/915f96a0_8714_42d7_8d2d_e897d5a9ce7a.jpg",
    ],
  },
  "Calça Jordan": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/1805ffd2_5fb7_454b_b098_2b00902025f3.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/b97f4616_986e_4f1e_a577_905cb99eb213.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Calc%CC%A7as/4/d626872b_35b1_4a96_b58a_ea5f7d6ceab7.jpg",
    ],
  },
  "Camiseta ACG": {
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/4f57e719_e120_4525_83d5_16955e27061b.png",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/a8a08dfb_a495_4c1b_9873_aa504cfe2fd7.webp",
    ],
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/1/a8c7b41f_69f0_4894_994f_de01533d1161.jpg",
    ],
  },
  "Camiseta Run": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/2/67db843e_691c_44a6_87b6_f5e01a1bcafe.webp",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/2/83ab03e1_6383_450b_b203_3509a00fdaf7.jpg",
    ],
  },
  "Camiseta Active": {
    Branca: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/3/c222d1e5_7cd7_4794_b644_57f47c9d344c.jpg",
    ],
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/3/d4c0657c_c2c2_4356_a509_61cd9ecc4148.webp",
    ],
  },
  "Camiseta Nature": {
    Preta: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/4/caa3015c_61b3_4315_86b1_cc62ab1d2fee.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Camisetas/4/d0e40dd5_2060_450e_a423_6e894bc0573f.webp",
    ],
  },
  "Corta Vento": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/1/4e134ee9_ce18_4b32_a4ad_aa55026a38f9.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/1/74ab7c8c_7c54_4c49_8084_24a87fe0fc85.jpg",
    ],
  },
  "Jaqueta Windrunner": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/2/79afe358_deb0_4309_8301_02a6e6aa6108.jpg",
    ],
    Bege: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/2/bc06d5b0_be4b_4c74_8c6e_8645ea7168bb.jpg",
    ],
  },
  "Jaqueta Style": {
    Marrom: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/3/06222020_01b8_4232_92f4_dc0c92bb25da.webp",
    ],
    Cinza: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/3/97de604a_deef_4594_a5a6_f51c18c71216.jpg",
    ],
  },
  "Jaqueta Nike Club": {
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/4/134c9642_f032_4c6e_84a8_68de99e3dcb7.jpg",
    ],
    Amarela: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Jaquetas+%26+Moletons/4/d8d78682_c480_40b0_97a1_93ab201b3287.jpg",
    ],
  },
  "Tênis Nike Vomero": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/85dc96b6_1cef_43ec_8cef_40e3938ac7cf.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/a4b97d0e_0065_4818_90f2_b0778ac48c6b.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/1/ac052fe0_60ce_4ce9_8b3c_fd5fb72eaf3b.jpg",
    ],
  },
  "Tênis Nike Panda": {
    Verde: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/2156e314_9889_4bdc_962d_7350f66cdf7f.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/2b938204_3950_4295_b61c_d4311045fed0.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/2/6ad78a9f_14a9_4590_8e7c_9392d0523678.jpg",
    ],
  },
  "Tênis Nike Air Force": {
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/3/5daa00d9_afae_4125_a95c_fc71923b81c3.jpg",
    ],
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/3/e6da41fa_1be4_4ce5_b89c_22be4f1f02d4.jpg",
    ],
  },
  "Tênis Nike Dunk Low": {
    Branco: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/4bc9c840_d8af_411a_9b72_a3f51f6dd3da.jpg",
    ],
    Preto: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/72f07a5b_4fb8_4182_98b7_1f91ad71ed5c.jpg",
    ],
    Azul: [
      "https://d4lgxe9bm8juw.cloudfront.net/products/Te%CC%82nis/4/bb4e381c_84ae_4ced_814f_8553afc6eacf.jpg",
    ],
  },
};

export const mockProducts: IProduct[] = [
  // Acessórios
  {
    id: 1,
    name: "Mochila",
    description:
      "Mochila resistente e confortável, ideal para o dia a dia e viagens.",
    categoryId: 1,
    best_selling: true,
    variants: [
      {
        id: 1,
        name: "Preta",
        priceInCents: 12999,
        imageUrl: productImages.Mochila.Preta[0],
        slug: generateSlug("Mochila Preta"),
        productId: 1,
        productName: "Mochila",
      },
      {
        id: 2,
        name: "Branca",
        priceInCents: 12999,
        imageUrl: productImages.Mochila.Branca[0],
        slug: generateSlug("Mochila Branca"),
        productId: 1,
        productName: "Mochila",
      },
    ],
  },
  {
    id: 2,
    name: "Meia Alta",
    description: "Meia alta de algodão, confortável e durável.",
    categoryId: 1,
    variants: [
      {
        id: 3,
        name: "Branca",
        priceInCents: 1999,
        imageUrl: productImages["Meia Alta"].Branca[0],
        slug: generateSlug("Meia Alta Branca"),
        productId: 2,
        productName: "Meia Alta",
      },
      {
        id: 4,
        name: "Preta",
        priceInCents: 1999,
        imageUrl: productImages["Meia Alta"].Preta[0],
        slug: generateSlug("Meia Alta Preta"),
        productId: 2,
        productName: "Meia Alta",
      },
    ],
  },
  {
    id: 3,
    name: "Boné Nocta",
    description: "Boné Nocta com design moderno e ajuste confortável.",
    categoryId: 1,
    best_selling: true,
    variants: [
      {
        id: 5,
        name: "Preto",
        priceInCents: 8999,
        imageUrl: productImages["Boné Nocta"].Preto[0],
        slug: generateSlug("Boné Nocta Preto"),
        productId: 3,
        productName: "Boné Nocta",
      },
      {
        id: 6,
        name: "Vinho",
        priceInCents: 8999,
        imageUrl: productImages["Boné Nocta"].Vinho[0],
        slug: generateSlug("Boné Nocta Vinho"),
        productId: 3,
        productName: "Boné Nocta",
      },
      {
        id: 7,
        name: "Azul",
        priceInCents: 8999,
        imageUrl: productImages["Boné Nocta"].Azul[0],
        slug: generateSlug("Boné Nocta Azul"),
        productId: 3,
        productName: "Boné Nocta",
      },
    ],
  },
  {
    id: 4,
    name: "Boné Curvo",
    description: "Boné com aba curva, estilo clássico e versátil.",
    categoryId: 1,
    variants: [
      {
        id: 8,
        name: "Azul",
        priceInCents: 7999,
        imageUrl: productImages["Boné Curvo"].Azul[0],
        slug: generateSlug("Boné Curvo Azul"),
        productId: 4,
        productName: "Boné Curvo",
      },
      {
        id: 9,
        name: "Bege",
        priceInCents: 7999,
        imageUrl: productImages["Boné Curvo"].Bege[0],
        slug: generateSlug("Boné Curvo Bege"),
        productId: 4,
        productName: "Boné Curvo",
      },
      {
        id: 10,
        name: "Verde",
        priceInCents: 7999,
        imageUrl: productImages["Boné Curvo"].Verde[0],
        slug: generateSlug("Boné Curvo Verde"),
        productId: 4,
        productName: "Boné Curvo",
      },
    ],
  },

  // Bermuda & Shorts
  {
    id: 5,
    name: "Shorts Active",
    description:
      "Shorts esportivo para atividades físicas, com tecido que absorve o suor.",
    categoryId: 2,
    best_selling: true,
    variants: [
      {
        id: 11,
        name: "Preto",
        priceInCents: 6999,
        imageUrl: productImages["Shorts Active"].Preto[0],
        slug: generateSlug("Shorts Active Preto"),
        productId: 5,
        productName: "Shorts Active",
      },
      {
        id: 12,
        name: "Azul",
        priceInCents: 6999,
        imageUrl: productImages["Shorts Active"].Azul[0],
        slug: generateSlug("Shorts Active Azul"),
        productId: 5,
        productName: "Shorts Active",
      },
      {
        id: 13,
        name: "Verde",
        priceInCents: 6999,
        imageUrl: productImages["Shorts Active"].Verde[0],
        slug: generateSlug("Shorts Active Verde"),
        productId: 5,
        productName: "Shorts Active",
      },
    ],
  },
  {
    id: 6,
    name: "Shorts Core",
    description: "Shorts casual confortável, perfeito para o dia a dia.",
    categoryId: 2,
    best_selling: true,

    variants: [
      {
        id: 14,
        name: "Verde",
        priceInCents: 5999,
        imageUrl: productImages["Shorts Core"].Verde[0],
        slug: generateSlug("Shorts Core Verde"),
        productId: 6,
        productName: "Shorts Core",
      },
      {
        id: 15,
        name: "Preto",
        priceInCents: 5999,
        imageUrl: productImages["Shorts Core"].Preto[0],
        slug: generateSlug("Shorts Core Preto"),
        productId: 6,
        productName: "Shorts Core",
      },
      {
        id: 16,
        name: "Azul",
        priceInCents: 5999,
        imageUrl: productImages["Shorts Core"].Azul[0],
        slug: generateSlug("Shorts Core Azul"),
        productId: 6,
        productName: "Shorts Core",
      },
    ],
  },
  {
    id: 7,
    name: "Shorts Challenger",
    description:
      "Shorts com design moderno e confortável, ideal para diversas ocasiões.",
    categoryId: 2,
    variants: [
      {
        id: 17,
        name: "Marrom",
        priceInCents: 7499,
        imageUrl: productImages["Shorts Challenger"].Marrom[0],
        slug: generateSlug("Shorts Challenger Marrom"),
        productId: 7,
        productName: "Shorts Challenger",
      },
      {
        id: 18,
        name: "Preto",
        priceInCents: 7499,
        imageUrl: productImages["Shorts Challenger"].Preto[0],
        slug: generateSlug("Shorts Challenger Preto"),
        productId: 7,
        productName: "Shorts Challenger",
      },
      {
        id: 19,
        name: "Bege",
        priceInCents: 7499,
        imageUrl: productImages["Shorts Challenger"].Bege[0],
        slug: generateSlug("Shorts Challenger Bege"),
        productId: 7,
        productName: "Shorts Challenger",
      },
    ],
  },
  {
    id: 8,
    name: "Bermuda Premier",
    description:
      "Bermuda premium com qualidade superior e design diferenciado.",
    categoryId: 2,
    variants: [
      {
        id: 20,
        name: "Verde",
        priceInCents: 8999,
        imageUrl: productImages["Bermuda Premier"].Verde[0],
        slug: generateSlug("Bermuda Premier Verde"),
        productId: 8,
        productName: "Bermuda Premier",
      },
      {
        id: 21,
        name: "Preta",
        priceInCents: 8999,
        imageUrl: productImages["Bermuda Premier"].Preta[0],
        slug: generateSlug("Bermuda Premier Preta"),
        productId: 8,
        productName: "Bermuda Premier",
      },
      {
        id: 22,
        name: "Azul",
        priceInCents: 8999,
        imageUrl: productImages["Bermuda Premier"].Azul[0],
        slug: generateSlug("Bermuda Premier Azul"),
        productId: 8,
        productName: "Bermuda Premier",
      },
    ],
  },

  // Calças
  {
    id: 9,
    name: "Calça Nike Club",
    description:
      "Calça esportiva Nike Club, confortável e versátil para treinos e uso casual.",
    categoryId: 3,
    best_selling: true,

    variants: [
      {
        id: 23,
        name: "Bege",
        priceInCents: 15999,
        imageUrl: productImages["Calça Nike Club"].Bege[0],
        slug: generateSlug("Calça Nike Club Bege"),
        productId: 9,
        productName: "Calça Nike Club",
      },
      {
        id: 24,
        name: "Preta",
        priceInCents: 15999,
        imageUrl: productImages["Calça Nike Club"].Preta[0],
        slug: generateSlug("Calça Nike Club Preta"),
        productId: 9,
        productName: "Calça Nike Club",
      },
      {
        id: 25,
        name: "Vinho",
        priceInCents: 15999,
        imageUrl: productImages["Calça Nike Club"].Vinho[0],
        slug: generateSlug("Calça Nike Club Vinho"),
        productId: 9,
        productName: "Calça Nike Club",
      },
    ],
  },
  {
    id: 10,
    name: "Calça Knit",
    description:
      "Calça de malha com tecido macio e confortável, ideal para relaxar.",
    categoryId: 3,
    variants: [
      {
        id: 26,
        name: "Preta",
        priceInCents: 12999,
        imageUrl: productImages["Calça Knit"].Preta[0],
        slug: generateSlug("Calça Knit Preta"),
        productId: 10,
        productName: "Calça Knit",
      },
      {
        id: 27,
        name: "Branca",
        priceInCents: 12999,
        imageUrl: productImages["Calça Knit"].Branca[0],
        slug: generateSlug("Calça Knit Branca"),
        productId: 10,
        productName: "Calça Knit",
      },
      {
        id: 28,
        name: "Azul",
        priceInCents: 12999,
        imageUrl: productImages["Calça Knit"].Azul[0],
        slug: generateSlug("Calça Knit Azul"),
        productId: 10,
        productName: "Calça Knit",
      },
    ],
  },
  {
    id: 11,
    name: "Calça Brooklin",
    description:
      "Calça com design urbano e moderno, perfeita para o street style.",
    categoryId: 3,
    variants: [
      {
        id: 29,
        name: "Bege",
        priceInCents: 13999,
        imageUrl: productImages["Calça Brooklin"].Bege[0],
        slug: generateSlug("Calça Brooklin Bege"),
        productId: 11,
        productName: "Calça Brooklin",
      },
      {
        id: 30,
        name: "Branca",
        priceInCents: 13999,
        imageUrl: productImages["Calça Brooklin"].Branca[0],
        slug: generateSlug("Calça Brooklin Branca"),
        productId: 11,
        productName: "Calça Brooklin",
      },
      {
        id: 31,
        name: "Preta",
        priceInCents: 13999,
        imageUrl: productImages["Calça Brooklin"].Preta[0],
        slug: generateSlug("Calça Brooklin Preta"),
        productId: 11,
        productName: "Calça Brooklin",
      },
    ],
  },
  {
    id: 12,
    name: "Calça Jordan",
    description:
      "Calça Jordan com qualidade premium e design icônico da marca.",
    categoryId: 3,
    best_selling: true,

    variants: [
      {
        id: 32,
        name: "Verde",
        priceInCents: 18999,
        imageUrl: productImages["Calça Jordan"].Verde[0],
        slug: generateSlug("Calça Jordan Verde"),
        productId: 12,
        productName: "Calça Jordan",
      },
      {
        id: 33,
        name: "Preta",
        priceInCents: 18999,
        imageUrl: productImages["Calça Jordan"].Preta[0],
        slug: generateSlug("Calça Jordan Preta"),
        productId: 12,
        productName: "Calça Jordan",
      },
      {
        id: 34,
        name: "Azul",
        priceInCents: 18999,
        imageUrl: productImages["Calça Jordan"].Azul[0],
        slug: generateSlug("Calça Jordan Azul"),
        productId: 12,
        productName: "Calça Jordan",
      },
    ],
  },

  // Camisetas
  {
    id: 13,
    name: "Camiseta ACG",
    description:
      "Camiseta ACG com design técnico e material de alta qualidade.",
    categoryId: 4,
    best_selling: true,
    variants: [
      {
        id: 35,
        name: "Bege",
        priceInCents: 6999,
        imageUrl: productImages["Camiseta ACG"].Bege[0],
        slug: generateSlug("Camiseta ACG Bege"),
        productId: 13,
        productName: "Camiseta ACG",
      },
      {
        id: 36,
        name: "Preta",
        priceInCents: 6999,
        imageUrl: productImages["Camiseta ACG"].Preta[0],
        slug: generateSlug("Camiseta ACG Preta"),
        productId: 13,
        productName: "Camiseta ACG",
      },
      {
        id: 37,
        name: "Branca",
        priceInCents: 6999,
        imageUrl: productImages["Camiseta ACG"].Branca[0],
        slug: generateSlug("Camiseta ACG Branca"),
        productId: 13,
        productName: "Camiseta ACG",
      },
    ],
  },
  {
    id: 14,
    name: "Camiseta Run",
    description:
      "Camiseta para corrida com tecido respirável e conforto superior.",
    categoryId: 4,
    variants: [
      {
        id: 38,
        name: "Preta",
        priceInCents: 5999,
        imageUrl: productImages["Camiseta Run"].Preta[0],
        slug: generateSlug("Camiseta Run Preta"),
        productId: 14,
        productName: "Camiseta Run",
      },
      {
        id: 39,
        name: "Azul",
        priceInCents: 5999,
        imageUrl: productImages["Camiseta Run"].Azul[0],
        slug: generateSlug("Camiseta Run Azul"),
        productId: 14,
        productName: "Camiseta Run",
      },
    ],
  },
  {
    id: 15,
    name: "Camiseta Active",
    description:
      "Camiseta esportiva para atividades físicas com tecnologia Dri-FIT.",
    categoryId: 4,
    variants: [
      {
        id: 40,
        name: "Branca",
        priceInCents: 5499,
        imageUrl: productImages["Camiseta Active"].Branca[0],
        slug: generateSlug("Camiseta Active Branca"),
        productId: 15,
        productName: "Camiseta Active",
      },
      {
        id: 41,
        name: "Preta",
        priceInCents: 5499,
        imageUrl: productImages["Camiseta Active"].Preta[0],
        slug: generateSlug("Camiseta Active Preta"),
        productId: 15,
        productName: "Camiseta Active",
      },
    ],
  },
  {
    id: 16,
    name: "Camiseta Nature",
    description:
      "Camiseta com estampa inspirada na natureza, confortável e estilosa.",
    categoryId: 4,
    variants: [
      {
        id: 42,
        name: "Preta",
        priceInCents: 6499,
        imageUrl: productImages["Camiseta Nature"].Preta[0],
        slug: generateSlug("Camiseta Nature Preta"),
        productId: 16,
        productName: "Camiseta Nature",
      },
      {
        id: 43,
        name: "Azul",
        priceInCents: 6499,
        imageUrl: productImages["Camiseta Nature"].Azul[0],
        slug: generateSlug("Camiseta Nature Azul"),
        productId: 16,
        productName: "Camiseta Nature",
      },
    ],
  },

  // Jaquetas & Moletons
  {
    id: 17,
    name: "Corta Vento",
    description:
      "Jaqueta corta-vento leve e resistente, ideal para atividades ao ar livre.",
    categoryId: 5,
    variants: [
      {
        id: 44,
        name: "Preto",
        priceInCents: 19999,
        imageUrl: productImages["Corta Vento"].Preto[0],
        slug: generateSlug("Corta Vento Preto"),
        productId: 17,
        productName: "Corta Vento",
      },
      {
        id: 45,
        name: "Branco",
        priceInCents: 19999,
        imageUrl: productImages["Corta Vento"].Branco[0],
        slug: generateSlug("Corta Vento Branco"),
        productId: 17,
        productName: "Corta Vento",
      },
    ],
  },
  {
    id: 18,
    name: "Jaqueta Windrunner",
    description:
      "Jaqueta Windrunner com design clássico e proteção contra o vento.",
    categoryId: 5,
    best_selling: true,

    variants: [
      {
        id: 46,
        name: "Azul",
        priceInCents: 22999,
        imageUrl: productImages["Jaqueta Windrunner"].Azul[0],
        slug: generateSlug("Jaqueta Windrunner Azul"),
        productId: 18,
        productName: "Jaqueta Windrunner",
      },
      {
        id: 47,
        name: "Bege",
        priceInCents: 22999,
        imageUrl: productImages["Jaqueta Windrunner"].Bege[0],
        slug: generateSlug("Jaqueta Windrunner Bege"),
        productId: 18,
        productName: "Jaqueta Windrunner",
      },
    ],
  },
  {
    id: 19,
    name: "Jaqueta Style",
    description:
      "Jaqueta com estilo urbano e moderno, perfeita para compor looks casuais.",
    categoryId: 5,
    variants: [
      {
        id: 48,
        name: "Marrom",
        priceInCents: 17999,
        imageUrl: productImages["Jaqueta Style"].Marrom[0],
        slug: generateSlug("Jaqueta Style Marrom"),
        productId: 19,
        productName: "Jaqueta Style",
      },
      {
        id: 49,
        name: "Cinza",
        priceInCents: 17999,
        imageUrl: productImages["Jaqueta Style"].Cinza[0],
        slug: generateSlug("Jaqueta Style Cinza"),
        productId: 19,
        productName: "Jaqueta Style",
      },
    ],
  },
  {
    id: 20,
    name: "Jaqueta Nike Club",
    description: "Jaqueta Nike Club com qualidade premium e design atemporal.",
    categoryId: 5,
    variants: [
      {
        id: 50,
        name: "Azul",
        priceInCents: 25999,
        imageUrl: productImages["Jaqueta Nike Club"].Azul[0],
        slug: generateSlug("Jaqueta Nike Club Azul"),
        productId: 20,
        productName: "Jaqueta Nike Club",
      },
      {
        id: 51,
        name: "Amarela",
        priceInCents: 25999,
        imageUrl: productImages["Jaqueta Nike Club"].Amarela[0],
        slug: generateSlug("Jaqueta Nike Club Amarela"),
        productId: 20,
        productName: "Jaqueta Nike Club",
      },
    ],
  },

  // Tênis
  {
    id: 21,
    name: "Tênis Nike Vomero",
    description:
      "Tênis Nike Vomero com tecnologia de amortecimento superior para corridas.",
    categoryId: 6,
    best_selling: true,
    variants: [
      {
        id: 52,
        name: "Preto",
        priceInCents: 79999,
        imageUrl: productImages["Tênis Nike Vomero"].Preto[0],
        slug: generateSlug("Tênis Nike Vomero Preto"),
        productId: 21,
        productName: "Tênis Nike Vomero",
      },
      {
        id: 53,
        name: "Branco",
        priceInCents: 79999,
        imageUrl: productImages["Tênis Nike Vomero"].Branco[0],
        slug: generateSlug("Tênis Nike Vomero Branco"),
        productId: 21,
        productName: "Tênis Nike Vomero",
      },
      {
        id: 54,
        name: "Azul",
        priceInCents: 79999,
        imageUrl: productImages["Tênis Nike Vomero"].Azul[0],
        slug: generateSlug("Tênis Nike Vomero Azul"),
        productId: 21,
        productName: "Tênis Nike Vomero",
      },
    ],
  },
  {
    id: 22,
    name: "Tênis Nike Panda",
    description: "Tênis Nike com design Panda icônico, confortável e estiloso.",
    categoryId: 6,
    variants: [
      {
        id: 55,
        name: "Verde",
        priceInCents: 69999,
        imageUrl: productImages["Tênis Nike Panda"].Verde[0],
        slug: generateSlug("Tênis Nike Panda Verde"),
        productId: 22,
        productName: "Tênis Nike Panda",
      },
      {
        id: 56,
        name: "Azul",
        priceInCents: 69999,
        imageUrl: productImages["Tênis Nike Panda"].Azul[0],
        slug: generateSlug("Tênis Nike Panda Azul"),
        productId: 22,
        productName: "Tênis Nike Panda",
      },
      {
        id: 57,
        name: "Preto",
        priceInCents: 69999,
        imageUrl: productImages["Tênis Nike Panda"].Preto[0],
        slug: generateSlug("Tênis Nike Panda Preto"),
        productId: 22,
        productName: "Tênis Nike Panda",
      },
    ],
  },
  {
    id: 23,
    name: "Tênis Nike Air Force",
    description:
      "Tênis Nike Air Force 1, um clássico atemporal com design icônico.",
    categoryId: 6,
    best_selling: true,
    variants: [
      {
        id: 58,
        name: "Preto",
        priceInCents: 89999,
        imageUrl: productImages["Tênis Nike Air Force"].Preto[0],
        slug: generateSlug("Tênis Nike Air Force Preto"),
        productId: 23,
        productName: "Tênis Nike Air Force",
      },
      {
        id: 59,
        name: "Branco",
        priceInCents: 89999,
        imageUrl: productImages["Tênis Nike Air Force"].Branco[0],
        slug: generateSlug("Tênis Nike Air Force Branco"),
        productId: 23,
        productName: "Tênis Nike Air Force",
      },
    ],
  },
  {
    id: 24,
    name: "Tênis Nike Dunk Low",
    description: "Tênis Nike Dunk Low com design retrô e conforto moderno.",
    categoryId: 6,
    best_selling: true,
    variants: [
      {
        id: 60,
        name: "Branco",
        priceInCents: 75999,
        imageUrl: productImages["Tênis Nike Dunk Low"].Branco[0],
        slug: generateSlug("Tênis Nike Dunk Low Branco"),
        productId: 24,
        productName: "Tênis Nike Dunk Low",
      },
      {
        id: 61,
        name: "Preto",
        priceInCents: 75999,
        imageUrl: productImages["Tênis Nike Dunk Low"].Preto[0],
        slug: generateSlug("Tênis Nike Dunk Low Preto"),
        productId: 24,
        productName: "Tênis Nike Dunk Low",
      },
      {
        id: 62,
        name: "Azul",
        priceInCents: 75999,
        imageUrl: productImages["Tênis Nike Dunk Low"].Azul[0],
        slug: generateSlug("Tênis Nike Dunk Low Azul"),
        productId: 24,
        productName: "Tênis Nike Dunk Low",
      },
    ],
  },
];

export const categories = [
  {
    id: 1,
    name: "Acessórios",
    description: "Mochilas, bonés, meias e outros acessórios",
  },
  {
    id: 2,
    name: "Bermuda & Shorts",
    description: "Bermudas e shorts para todas as ocasiões",
  },
  {
    id: 3,
    name: "Calças",
    description: "Calças casuais e esportivas",
  },
  {
    id: 4,
    name: "Camisetas",
    description: "Camisetas casuais e esportivas",
  },
  {
    id: 5,
    name: "Jaquetas & Moletons",
    description: "Jaquetas, corta-ventos e moletons",
  },
  {
    id: 6,
    name: "Tênis",
    description: "Tênis casuais e esportivos",
  },
];

export const brands = [
  {
    id: 1,
    name: "Nike",
    logoUrl: "/images/logos/nike.png",
  },
  {
    id: 2,
    name: "Adidas",
    logoUrl: "/images/logos/adidas.png",
  },
  {
    id: 3,
    name: "Under Armour",
    logoUrl: "/images/logos/under.png",
  },
  {
    id: 4,
    name: "Puma",
    logoUrl: "/images/logos/puma.png",
  },
  {
    id: 6,
    name: "New Balance",
    logoUrl: "/images/logos/new-balance.png",
  },
];

export const cart = {
  totalPriceInCents: 12999,
  items: [
    {
      id: "1",
      productVariant: {
        id: "1",
        name: "Mochila",
        priceInCents: 12999,
        imageUrl:
          "https://d4lgxe9bm8juw.cloudfront.net/products/Acesso%CC%81rios/1/78f9fa3b_c793_472a_b183_e32495033da2.jpg",
        slug: "mochila",
      },
      quantity: 1,
    },
  ],
};
