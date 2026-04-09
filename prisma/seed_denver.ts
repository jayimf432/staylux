// Load .env.local before anything else
import * as fs from "fs";
import * as path from "path";
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("Password123!", 12);
  console.log("Seeding Denver hosts...");
  const hostMap: Record<string, string> = {};
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_2416216@staylux.com" },
      update: {},
      create: { name: "Jason", email: "denver_host_2416216@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/2416216/profile_pic/1368757669/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["2416216"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_88156830@staylux.com" },
      update: {},
      create: { name: "Jennifer", email: "denver_host_88156830@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/4ad3fc4b-1ba3-4562-ac03-550187a8d207.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["88156830"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_219524979@staylux.com" },
      update: {},
      create: { name: "Sonder (Denver)", email: "denver_host_219524979@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/a52a18ac-f938-4127-b97d-4682faddb3df.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["219524979"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_32967501@staylux.com" },
      update: {},
      create: { name: "Michael Bryan", email: "denver_host_32967501@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/a362fc7f-3699-4c90-a076-9cd995e0ab3e.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["32967501"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_36757616@staylux.com" },
      update: {},
      create: { name: "Jessica", email: "denver_host_36757616@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/9f995d46-c200-430a-b578-31c984721b89.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["36757616"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_165269170@staylux.com" },
      update: {},
      create: { name: "Stephen Barnhardt", email: "denver_host_165269170@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/31122a8c-ff10-4036-8219-70e4a3402243.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["165269170"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_20461002@staylux.com" },
      update: {},
      create: { name: "Lana", email: "denver_host_20461002@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/46bc5145-6858-484a-808c-6f7ec33b83cd.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["20461002"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_55376910@staylux.com" },
      update: {},
      create: { name: "Kelsey", email: "denver_host_55376910@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/fc68b6c4-aba0-4330-ba67-39c89cb9715a.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["55376910"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_113264940@staylux.com" },
      update: {},
      create: { name: "Brad", email: "denver_host_113264940@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/808e2faf-df88-4fed-990e-6deb1cbdccb2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["113264940"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_53312831@staylux.com" },
      update: {},
      create: { name: "Laura", email: "denver_host_53312831@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e691e11c-8648-49cf-beea-0b2c4b2cc567.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["53312831"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_6065807@staylux.com" },
      update: {},
      create: { name: "Kimberly & Tonya", email: "denver_host_6065807@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-6065807/original/6d27fb8f-0045-4e98-b44d-90394c6a3c03.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["6065807"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_20045562@staylux.com" },
      update: {},
      create: { name: "Diana", email: "denver_host_20045562@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/20045562/profile_pic/1408329706/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["20045562"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_28359129@staylux.com" },
      update: {},
      create: { name: "Matthew John", email: "denver_host_28359129@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bfc3b005-4657-4e8e-871f-7262526ae29f.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["28359129"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_724381@staylux.com" },
      update: {},
      create: { name: "George Robert Iv", email: "denver_host_724381@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/724381/profile_pic/1404170103/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["724381"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_666@staylux.com" },
      update: {},
      create: { name: "Jennifer", email: "denver_host_666@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/666/profile_pic/1259092920/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["666"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_50847379@staylux.com" },
      update: {},
      create: { name: "Joshua Paul", email: "denver_host_50847379@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/d6491393-5c48-4732-8e4b-59077cda7bf8.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["50847379"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_48448059@staylux.com" },
      update: {},
      create: { name: "Judy", email: "denver_host_48448059@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/782c8e26-5f91-47e6-9e6a-5728933edf4e.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["48448059"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_114332015@staylux.com" },
      update: {},
      create: { name: "Benjamin", email: "denver_host_114332015@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/9ef96ee9-c0d4-4864-b628-5520a7d72c7e.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["114332015"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_14949477@staylux.com" },
      update: {},
      create: { name: "Gary", email: "denver_host_14949477@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/4e34c553-8869-4184-95a6-d1152eb7ee52.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["14949477"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_196667037@staylux.com" },
      update: {},
      create: { name: "Katia", email: "denver_host_196667037@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/dbd31faf-a05b-4922-a1d3-2b6b99e9b4b2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["196667037"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_107511912@staylux.com" },
      update: {},
      create: { name: "Jason", email: "denver_host_107511912@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1e37705f-4fb0-47cc-abb8-6059009a80a7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["107511912"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_13416841@staylux.com" },
      update: {},
      create: { name: "Melanie", email: "denver_host_13416841@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/13416841/profile_pic/1439998214/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["13416841"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_16072418@staylux.com" },
      update: {},
      create: { name: "Jack", email: "denver_host_16072418@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ec085a1c-ae9c-4b0c-b6ee-cc2931365eea.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["16072418"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_93197703@staylux.com" },
      update: {},
      create: { name: "Julie", email: "denver_host_93197703@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/3a348afa-5290-4f84-a893-091e02224d83.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["93197703"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_492297949@staylux.com" },
      update: {},
      create: { name: "Denver Downtown", email: "denver_host_492297949@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/abdefeff-6f13-4e97-a727-cc7f5968c9d7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["492297949"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_69009301@staylux.com" },
      update: {},
      create: { name: "Herbert", email: "denver_host_69009301@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/14902442-85ea-4a81-9542-9c076a765b8f.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["69009301"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_47421139@staylux.com" },
      update: {},
      create: { name: "Rob", email: "denver_host_47421139@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-47421139/original/4ad70085-aa2c-4f3b-8298-d5f824121247.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["47421139"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_8066753@staylux.com" },
      update: {},
      create: { name: "Jeffrey Paul", email: "denver_host_8066753@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/8066753/profile_pic/1390246805/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["8066753"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_24532369@staylux.com" },
      update: {},
      create: { name: "Christina Joan", email: "denver_host_24532369@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/f49704d2-f70e-4c39-aa83-1f67f19461af.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["24532369"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_11000035@staylux.com" },
      update: {},
      create: { name: "Christopher", email: "denver_host_11000035@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-11000035/original/ee5b2a5c-b872-450b-bb00-fd71320c6fad.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["11000035"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_21982508@staylux.com" },
      update: {},
      create: { name: "Jeffrey", email: "denver_host_21982508@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/b83076ab-aff8-4412-9409-9b42304b92f1.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["21982508"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_68062201@staylux.com" },
      update: {},
      create: { name: "Tomas", email: "denver_host_68062201@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/45308884-e621-429d-868f-9e508e59d40d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["68062201"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_49223382@staylux.com" },
      update: {},
      create: { name: "Instant Book Homes", email: "denver_host_49223382@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/a80ee5b8-cb71-4f4a-be3b-c25f9f9698b7.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["49223382"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_22292048@staylux.com" },
      update: {},
      create: { name: "Kathryn", email: "denver_host_22292048@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/d82775dc-7a0a-4a7e-9332-a5d4a70eca92.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["22292048"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_74368861@staylux.com" },
      update: {},
      create: { name: "Alicia", email: "denver_host_74368861@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e56d7084-f919-43ab-857d-aff2c214df20.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["74368861"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_151512284@staylux.com" },
      update: {},
      create: { name: "Hanna", email: "denver_host_151512284@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/16895baf-6590-4b3b-b152-2afc4c408b8d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["151512284"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_232970198@staylux.com" },
      update: {},
      create: { name: "Andrew", email: "denver_host_232970198@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-232970198/original/323dff89-01be-4637-a5e5-608bd40d70cb.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["232970198"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_42637305@staylux.com" },
      update: {},
      create: { name: "Erica Cohn", email: "denver_host_42637305@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/b4bf3d31-47a0-4458-b38d-e35bc16a7fd2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["42637305"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_40976829@staylux.com" },
      update: {},
      create: { name: "William Zachary", email: "denver_host_40976829@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-40976829/original/69c59708-96d4-4f7e-b35c-a4b48407bde6.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["40976829"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_60744966@staylux.com" },
      update: {},
      create: { name: "Jenna", email: "denver_host_60744966@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/aec3e368-4046-4d70-b104-5f5ea16d87e6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["60744966"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_48525049@staylux.com" },
      update: {},
      create: { name: "Kenny", email: "denver_host_48525049@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/515653c7-1510-473e-92d7-459b7c3e41e2.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["48525049"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_25607097@staylux.com" },
      update: {},
      create: { name: "Steven", email: "denver_host_25607097@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/12dd805f-5bcd-4924-bee3-ace72181dbca.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["25607097"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_106947890@staylux.com" },
      update: {},
      create: { name: "Daniel", email: "denver_host_106947890@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/484f15f5-2d12-4781-b977-3ea4d76cdd2f.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["106947890"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_11496272@staylux.com" },
      update: {},
      create: { name: "Listy", email: "denver_host_11496272@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/7c4d6829-8c8d-4185-9fde-070be2f3a7f4.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["11496272"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_38865640@staylux.com" },
      update: {},
      create: { name: "Charles", email: "denver_host_38865640@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/90a02d49-c8ad-4a0f-b3a1-07e48234b3f3.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["38865640"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_80564551@staylux.com" },
      update: {},
      create: { name: "Tracy", email: "denver_host_80564551@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/cc856fe2-0f18-49fe-bb5f-f4cc84ec02b0.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["80564551"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_1093754@staylux.com" },
      update: {},
      create: { name: "Darren", email: "denver_host_1093754@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/1093754/profile_pic/1400028833/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["1093754"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_52363049@staylux.com" },
      update: {},
      create: { name: "Michelle", email: "denver_host_52363049@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/aebd70e5-f04f-4326-b601-0db7010cefa2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["52363049"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_58105586@staylux.com" },
      update: {},
      create: { name: "Kelli", email: "denver_host_58105586@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/6a6e179b-6788-452a-8ee1-88f61175ff31.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["58105586"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_19871094@staylux.com" },
      update: {},
      create: { name: "Carly", email: "denver_host_19871094@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/19871094/profile_pic/1407813441/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["19871094"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_221190712@staylux.com" },
      update: {},
      create: { name: "Sara", email: "denver_host_221190712@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/593dfc82-453f-41bc-ae07-c42ca93e8bd5.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["221190712"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_11850286@staylux.com" },
      update: {},
      create: { name: "Portia", email: "denver_host_11850286@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/04851d17-ba0c-4316-ac3b-d3143ffe0d9e.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["11850286"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_23466084@staylux.com" },
      update: {},
      create: { name: "Tyler", email: "denver_host_23466084@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/70d10c3e-b20f-4eb8-9b51-30fa6cedf5d5.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["23466084"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_112293494@staylux.com" },
      update: {},
      create: { name: "Rodney", email: "denver_host_112293494@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/494e6b21-6058-4e1e-aa7b-206183a595c6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["112293494"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_9859688@staylux.com" },
      update: {},
      create: { name: "David", email: "denver_host_9859688@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/4f247560-227a-4d7d-b106-28874adc5dea.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["9859688"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_47859549@staylux.com" },
      update: {},
      create: { name: "Allison", email: "denver_host_47859549@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/4bc9edc4-26e6-4611-89ec-63c8c641a60f.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["47859549"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_61177011@staylux.com" },
      update: {},
      create: { name: "Kerrie", email: "denver_host_61177011@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/3f928064-ca43-409e-9a12-7c28b04e36a2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["61177011"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_64249345@staylux.com" },
      update: {},
      create: { name: "Lisa", email: "denver_host_64249345@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/657ba5d5-34aa-43d9-8d9e-09e8e631641e.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["64249345"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_5449792@staylux.com" },
      update: {},
      create: { name: "Kerry", email: "denver_host_5449792@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bd04d76c-d447-48cb-9292-f8da71494549.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["5449792"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_268426834@staylux.com" },
      update: {},
      create: { name: "Tom", email: "denver_host_268426834@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/3e0eec44-0396-414c-a4bb-e3ffc9935806.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["268426834"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_47682244@staylux.com" },
      update: {},
      create: { name: "Timothy", email: "denver_host_47682244@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ee875d87-46c4-404b-9b3a-a51777d8cfa7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["47682244"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_280045010@staylux.com" },
      update: {},
      create: { name: "Sarah", email: "denver_host_280045010@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/c639c06f-d7ee-4843-8af7-251eebe2a4e4.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["280045010"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_34516070@staylux.com" },
      update: {},
      create: { name: "Robert", email: "denver_host_34516070@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1c20e769-6e0f-4242-abbf-68331f1d3eee.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["34516070"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_3256573@staylux.com" },
      update: {},
      create: { name: "Daphne", email: "denver_host_3256573@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/d4b4f891-bd53-4140-bf17-d978b627cac8.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["3256573"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_5338178@staylux.com" },
      update: {},
      create: { name: "Tyler", email: "denver_host_5338178@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/30f48cf2-b126-46f9-aa3e-cb397d1b96dc.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["5338178"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_17081686@staylux.com" },
      update: {},
      create: { name: "Gannon", email: "denver_host_17081686@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-17081686/original/16af9d4d-2c08-4b5d-b0c4-b5bc2f2c3cf5.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["17081686"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_88566861@staylux.com" },
      update: {},
      create: { name: "Kasa", email: "denver_host_88566861@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/111521a0-aadb-48d5-ac98-c757e54d2efb.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["88566861"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_52788342@staylux.com" },
      update: {},
      create: { name: "James", email: "denver_host_52788342@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/89653b15-840c-49d9-bde6-dfaa0d5c3e15.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["52788342"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_268095022@staylux.com" },
      update: {},
      create: { name: "Matthew", email: "denver_host_268095022@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/3f7ca35e-c27d-4e20-8f92-0c1ce3c77f27.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["268095022"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_22620764@staylux.com" },
      update: {},
      create: { name: "Paulo", email: "denver_host_22620764@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/f8026d7b-727e-4e7e-88a6-2067021513cf.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["22620764"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_45038909@staylux.com" },
      update: {},
      create: { name: "Salimah", email: "denver_host_45038909@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1cf31a06-b236-4d18-a811-cf7aa93d5403.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["45038909"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_24517598@staylux.com" },
      update: {},
      create: { name: "Alex", email: "denver_host_24517598@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/fba10b40-c4b1-4636-be46-d7e27481b7b9.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["24517598"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_284805380@staylux.com" },
      update: {},
      create: { name: "Peter", email: "denver_host_284805380@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/fe0ac702-ca80-44e1-a82c-ffc1ae77be39.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["284805380"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_19196235@staylux.com" },
      update: {},
      create: { name: "Michael Allan", email: "denver_host_19196235@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/194009ea-311c-49d6-8183-8db0cc5d1c9a.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["19196235"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_240217727@staylux.com" },
      update: {},
      create: { name: "Nic", email: "denver_host_240217727@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/da2ef611-f84f-4f97-b4db-803adc47ee63.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["240217727"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_47046454@staylux.com" },
      update: {},
      create: { name: "Katie", email: "denver_host_47046454@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1db95a51-97d4-49b4-9bca-ba9af9774802.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["47046454"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_26476553@staylux.com" },
      update: {},
      create: { name: "Skylar", email: "denver_host_26476553@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/d0d2d2c1-012a-412a-8e13-44a25bbe9a18.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["26476553"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_121135906@staylux.com" },
      update: {},
      create: { name: "Amelia", email: "denver_host_121135906@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-121135906/original/7758eb91-3b96-496a-9526-e884ec6e63e7.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["121135906"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_30972487@staylux.com" },
      update: {},
      create: { name: "Sabrina", email: "denver_host_30972487@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/eb950137-05e5-4809-9ef3-9f2693bcacbb.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["30972487"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_261774896@staylux.com" },
      update: {},
      create: { name: "Todd", email: "denver_host_261774896@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/98186d7d-c270-45ce-b262-911c683c74e8.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["261774896"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_11124324@staylux.com" },
      update: {},
      create: { name: "Rachel", email: "denver_host_11124324@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-11124324/original/2f896e3f-0b9b-4e3a-add0-285abfbb0884.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["11124324"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_209297769@staylux.com" },
      update: {},
      create: { name: "Tahvory", email: "denver_host_209297769@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/21353fd0-b32d-4d3d-8bd5-82274a831a4c.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["209297769"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_1895593@staylux.com" },
      update: {},
      create: { name: "Ryan", email: "denver_host_1895593@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-1895593/original/f04379c7-ac6b-48d8-8f55-c6003115f52b.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["1895593"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_63778241@staylux.com" },
      update: {},
      create: { name: "Peter Joshua", email: "denver_host_63778241@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/c98ce370-5ab0-461b-931b-6b58d0dc38ff.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["63778241"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_52470095@staylux.com" },
      update: {},
      create: { name: "Kristin", email: "denver_host_52470095@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/20fb4dee-bffe-4b6e-abff-0c43befd51c2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["52470095"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_21899708@staylux.com" },
      update: {},
      create: { name: "Leon", email: "denver_host_21899708@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/9eec837c-da42-4e03-974b-fd8f19c37942.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["21899708"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_33601029@staylux.com" },
      update: {},
      create: { name: "Joseph", email: "denver_host_33601029@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/490df3ce-bec9-4a3c-ac95-5cfaca8200f7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["33601029"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_4336857@staylux.com" },
      update: {},
      create: { name: "Ryan", email: "denver_host_4336857@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/4336857/profile_pic/1399855043/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["4336857"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_117026480@staylux.com" },
      update: {},
      create: { name: "Kyle", email: "denver_host_117026480@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/b6088ebe-c884-4d56-b7f5-807370d6d88c.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["117026480"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_172528574@staylux.com" },
      update: {},
      create: { name: "Stacy", email: "denver_host_172528574@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/4fac8e10-f3e2-4309-96e2-8322a26419ce.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["172528574"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_155712512@staylux.com" },
      update: {},
      create: { name: "Ivan", email: "denver_host_155712512@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/99e6bf78-cefb-4950-8d29-8446d07205f7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["155712512"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_151149715@staylux.com" },
      update: {},
      create: { name: "Cameron", email: "denver_host_151149715@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/07d66855-f18e-407a-8331-76af1a40a603.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["151149715"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_2086212@staylux.com" },
      update: {},
      create: { name: "William", email: "denver_host_2086212@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bd850034-e9c6-475b-85d2-1c59c477e332.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["2086212"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_25549082@staylux.com" },
      update: {},
      create: { name: "Danielle", email: "denver_host_25549082@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/c4d0a809-6bcf-42d5-9378-c517317956e0.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["25549082"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_125224431@staylux.com" },
      update: {},
      create: { name: "Vivi", email: "denver_host_125224431@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/549cddf1-75e1-46d1-9c13-699a03cada4a.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["125224431"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_130971585@staylux.com" },
      update: {},
      create: { name: "Marlene", email: "denver_host_130971585@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/213cbc68-0b5a-4e12-89dd-9154357ad6d7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["130971585"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_60414610@staylux.com" },
      update: {},
      create: { name: "Nathaniel", email: "denver_host_60414610@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/45dfe311-0ff1-49a9-b830-56252b3f405d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["60414610"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_71381744@staylux.com" },
      update: {},
      create: { name: "Tonya", email: "denver_host_71381744@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/c9e07ddb-3e00-4b14-a9d4-e334f1ad9e85.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["71381744"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_17500067@staylux.com" },
      update: {},
      create: { name: "Jacob Lee", email: "denver_host_17500067@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e2f8f46d-7d20-47b5-9fdb-4a5e6f4fb84f.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["17500067"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_86155912@staylux.com" },
      update: {},
      create: { name: "Channan", email: "denver_host_86155912@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/582e5b3c-c5d7-4e63-9e7c-ed8e6887c736.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["86155912"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_10951@staylux.com" },
      update: {},
      create: { name: "Tricia", email: "denver_host_10951@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/10951/profile_pic/1298950841/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["10951"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_47979834@staylux.com" },
      update: {},
      create: { name: "Deana", email: "denver_host_47979834@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/6a600f7f-66d4-4c17-a73b-af5d36f9edac.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["47979834"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_161582412@staylux.com" },
      update: {},
      create: { name: "Justin", email: "denver_host_161582412@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/9658341a-38a1-46f1-a47e-11f2107c6b26.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["161582412"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_3638426@staylux.com" },
      update: {},
      create: { name: "Ling & Chris", email: "denver_host_3638426@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e0497b3e-7484-4d15-9a90-61f3f3a5adb5.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["3638426"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_102649781@staylux.com" },
      update: {},
      create: { name: "Tama", email: "denver_host_102649781@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/7ac284ad-0a9c-4ca2-8afa-786812a00402.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["102649781"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_43193247@staylux.com" },
      update: {},
      create: { name: "Simon", email: "denver_host_43193247@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/5c3df643-4ccd-4355-81ab-d2a7ae23be3d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["43193247"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_372227538@staylux.com" },
      update: {},
      create: { name: "Shannon", email: "denver_host_372227538@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/a327a609-8511-4107-82c9-f6de8cc9f43e.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["372227538"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_162222305@staylux.com" },
      update: {},
      create: { name: "Dillon", email: "denver_host_162222305@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/a7201006-f95d-4963-b832-a628f42c8a43.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["162222305"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_4321221@staylux.com" },
      update: {},
      create: { name: "Molly", email: "denver_host_4321221@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/37715be8-c8bf-4b41-89d0-4e8f872bd17c.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["4321221"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_53337369@staylux.com" },
      update: {},
      create: { name: "Anne", email: "denver_host_53337369@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1665ecb9-4eac-4d2d-8b56-8623d8d4356a.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["53337369"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_3543517@staylux.com" },
      update: {},
      create: { name: "Christiane", email: "denver_host_3543517@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/f024d5b4-013d-489e-87c0-a99f74698530.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["3543517"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_68535175@staylux.com" },
      update: {},
      create: { name: "Tyler", email: "denver_host_68535175@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/73f4fb22-234d-46fa-afe6-d9ce3a080056.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["68535175"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_10161902@staylux.com" },
      update: {},
      create: { name: "Rebecca", email: "denver_host_10161902@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/35bf8f7e-3064-40fc-ab0d-5184dc1d67e3.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["10161902"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_78356@staylux.com" },
      update: {},
      create: { name: "Gabriel Vanessa", email: "denver_host_78356@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/726e621e-2082-43d6-bfe4-6244da715aa8.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["78356"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_334357@staylux.com" },
      update: {},
      create: { name: "Dudley S", email: "denver_host_334357@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e02b0dd2-6d67-418a-b2d7-879f79ec8edf.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["334357"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_268797798@staylux.com" },
      update: {},
      create: { name: "Phuoc Dung", email: "denver_host_268797798@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/510e69b8-a286-4bd8-9cac-f27938eaf167.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["268797798"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_4272021@staylux.com" },
      update: {},
      create: { name: "Sasha", email: "denver_host_4272021@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/646fa676-c07c-4290-a0aa-795caae704b1.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["4272021"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_58098571@staylux.com" },
      update: {},
      create: { name: "Brooke", email: "denver_host_58098571@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/22257710-5a1d-4ce2-b6d2-51ad2f771abf.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["58098571"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_9447036@staylux.com" },
      update: {},
      create: { name: "Zachary", email: "denver_host_9447036@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-9447036/original/df7cc3a8-35cc-4e7b-b1e1-c1eebee054d8.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["9447036"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_6498749@staylux.com" },
      update: {},
      create: { name: "Jarrod", email: "denver_host_6498749@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/26272548-36ba-4170-bbcd-cb88b67d2c26.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["6498749"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_38793718@staylux.com" },
      update: {},
      create: { name: "Hasena", email: "denver_host_38793718@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/8a393b6a-c084-4ec1-b296-525795f319c9.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["38793718"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_51768939@staylux.com" },
      update: {},
      create: { name: "Rafer", email: "denver_host_51768939@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/8a02affc-9fa3-41e8-ad60-18c206198eb1.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["51768939"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_63262656@staylux.com" },
      update: {},
      create: { name: "Jacob", email: "denver_host_63262656@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/131bd292-9602-4aad-965b-03d73a5ff2bb.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["63262656"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_20578951@staylux.com" },
      update: {},
      create: { name: "Ryan", email: "denver_host_20578951@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/d2155eca-cacf-4ed3-a7dd-4e26fe159299.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["20578951"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_50403533@staylux.com" },
      update: {},
      create: { name: "Aaron", email: "denver_host_50403533@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/407778e9-8f58-4c27-8fac-96635d16cdf6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["50403533"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_133083388@staylux.com" },
      update: {},
      create: { name: "Viola", email: "denver_host_133083388@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/9731de68-2d4b-47e2-8061-642169b0a8e5.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["133083388"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_329037890@staylux.com" },
      update: {},
      create: { name: "Villaflor", email: "denver_host_329037890@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/958f410f-2d39-442b-81df-c258181dd594.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["329037890"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_8751405@staylux.com" },
      update: {},
      create: { name: "Maria", email: "denver_host_8751405@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/981a80a8-15e4-4c40-b9b4-3aecb4202c81.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["8751405"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_257668522@staylux.com" },
      update: {},
      create: { name: "John Christopher", email: "denver_host_257668522@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-257668522/original/34ff0d74-ab42-43ae-ab41-4f6ae3357aef.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["257668522"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_156572511@staylux.com" },
      update: {},
      create: { name: "Tyler", email: "denver_host_156572511@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bbad395d-dec9-4324-acb5-e7c2e179446d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["156572511"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_10653789@staylux.com" },
      update: {},
      create: { name: "James", email: "denver_host_10653789@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/10653789/profile_pic/1387211880/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["10653789"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_33666244@staylux.com" },
      update: {},
      create: { name: "Beth Lee", email: "denver_host_33666244@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/df3d7ffe-dd71-4c77-b071-431a58be6f8b.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["33666244"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_7883078@staylux.com" },
      update: {},
      create: { name: "Keith Richard", email: "denver_host_7883078@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-7883078/original/8c29af52-96ff-4a28-a12b-31f0af2ce80d.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["7883078"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_576644@staylux.com" },
      update: {},
      create: { name: "Carol", email: "denver_host_576644@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-576644/original/94d24077-1295-42ed-9134-89d837fb33be.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["576644"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_6294270@staylux.com" },
      update: {},
      create: { name: "Daniel Warren", email: "denver_host_6294270@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/6294270/profile_pic/1384306818/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["6294270"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_33036680@staylux.com" },
      update: {},
      create: { name: "Alex", email: "denver_host_33036680@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/64620154-c3e8-46b7-bf18-8b60a67c4727.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["33036680"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_109534927@staylux.com" },
      update: {},
      create: { name: "Katherine", email: "denver_host_109534927@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/741c5ad5-890b-4666-84c9-1d72a6d48784.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["109534927"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_7343682@staylux.com" },
      update: {},
      create: { name: "Josh", email: "denver_host_7343682@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/335d6c39-0f69-4f4e-8091-adb28215e4bd.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["7343682"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_3585963@staylux.com" },
      update: {},
      create: { name: "Carrie Elizabeth", email: "denver_host_3585963@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/175cad2d-0702-4757-8e14-a33d545630c5.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["3585963"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_72164908@staylux.com" },
      update: {},
      create: { name: "Kyle", email: "denver_host_72164908@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/55c05ada-f2f6-46d2-9b9f-a18ef837a7ea.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["72164908"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_105144406@staylux.com" },
      update: {},
      create: { name: "Bonnie", email: "denver_host_105144406@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/f00741e1-b4fa-42d7-8917-4f0da6182caa.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["105144406"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_106954633@staylux.com" },
      update: {},
      create: { name: "Benjamin", email: "denver_host_106954633@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/54f30994-21e7-4fd0-a2f5-ab2f55e7eb53.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["106954633"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_6807612@staylux.com" },
      update: {},
      create: { name: "Sarah", email: "denver_host_6807612@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/73d540da-4c9e-4189-9f43-94796de59b63.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["6807612"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_1750207@staylux.com" },
      update: {},
      create: { name: "Kimberly & Marke", email: "denver_host_1750207@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ba8cbcf5-3191-4597-8d2f-65d7bd85d7be.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["1750207"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_12194428@staylux.com" },
      update: {},
      create: { name: "Courtney", email: "denver_host_12194428@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bbf5736e-f7b2-4f4b-a8f9-c12cb13860e6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["12194428"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_2440834@staylux.com" },
      update: {},
      create: { name: "Dayna And Marcus", email: "denver_host_2440834@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/20213b12-513d-4aee-904e-d18149540df3.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["2440834"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_426625975@staylux.com" },
      update: {},
      create: { name: "Anthony", email: "denver_host_426625975@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/4bcac136-fd34-42e5-88e4-cb4ccab5fda8.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["426625975"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_41486741@staylux.com" },
      update: {},
      create: { name: "Jason", email: "denver_host_41486741@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/0288f42c-6884-40c2-851f-e4775da088b6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["41486741"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_10387069@staylux.com" },
      update: {},
      create: { name: "Rebecca", email: "denver_host_10387069@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/d243fd51-1d55-4c2b-9a03-d90e53f122ee.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["10387069"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_260210753@staylux.com" },
      update: {},
      create: { name: "Michelle", email: "denver_host_260210753@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/5c716545-ca06-4a49-93a6-7abff37a4a20.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["260210753"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_51532358@staylux.com" },
      update: {},
      create: { name: "Emily", email: "denver_host_51532358@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/2ccdc604-e35e-4d46-8ae1-5567177d5455.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["51532358"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_29103624@staylux.com" },
      update: {},
      create: { name: "Aimee", email: "denver_host_29103624@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ee4f4e7c-186a-441e-ae3d-8e1d1377512c.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["29103624"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_71512884@staylux.com" },
      update: {},
      create: { name: "Michelle", email: "denver_host_71512884@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/97bc667a-382f-4a84-aefd-8ac49a3a14d2.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["71512884"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_14874662@staylux.com" },
      update: {},
      create: { name: "Nicholas Holden", email: "denver_host_14874662@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/a3b5b1e2-b030-44d8-89a1-e47530f230b9.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["14874662"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_23977016@staylux.com" },
      update: {},
      create: { name: "Ben", email: "denver_host_23977016@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/23977016/profile_pic/1419288921/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["23977016"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_139314021@staylux.com" },
      update: {},
      create: { name: "Jarrett Joseph", email: "denver_host_139314021@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/dd51c220-7d4c-4508-b11c-78db12ff2001.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["139314021"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_41917396@staylux.com" },
      update: {},
      create: { name: "L. Daniel", email: "denver_host_41917396@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/41917396/profile_pic/1440172480/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["41917396"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_32593250@staylux.com" },
      update: {},
      create: { name: "Erik", email: "denver_host_32593250@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/2f1ef8f1-638d-4c08-83ce-9e4797f550ab.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["32593250"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_187875664@staylux.com" },
      update: {},
      create: { name: "Jeanine", email: "denver_host_187875664@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bc24548a-65ac-4b56-abcb-3ac3b2b011fb.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["187875664"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_48954452@staylux.com" },
      update: {},
      create: { name: "John R", email: "denver_host_48954452@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/00f5dcd3-0df5-4f75-bd8a-542c8b5a93ab.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["48954452"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_219520656@staylux.com" },
      update: {},
      create: { name: "Megan", email: "denver_host_219520656@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/0a544741-056b-48fc-a923-9e5a9d22e2cd.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["219520656"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_56267154@staylux.com" },
      update: {},
      create: { name: "Daniel", email: "denver_host_56267154@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/29ef95e2-db02-409a-888c-cf75dfb33976.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["56267154"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_107582791@staylux.com" },
      update: {},
      create: { name: "Todd", email: "denver_host_107582791@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/58f04017-0921-4915-81f9-69296eda9bb6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["107582791"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_196418785@staylux.com" },
      update: {},
      create: { name: "Matthew Stephen", email: "denver_host_196418785@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/a846606c-ac41-47d5-bf45-8d2ed325e28b.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["196418785"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_28939848@staylux.com" },
      update: {},
      create: { name: "Christina", email: "denver_host_28939848@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/9856d763-9699-4285-9985-2b4094d99963.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["28939848"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_96040278@staylux.com" },
      update: {},
      create: { name: "Michael", email: "denver_host_96040278@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/db8ddc92-9c26-4566-959b-9312386a256b.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["96040278"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_74646741@staylux.com" },
      update: {},
      create: { name: "Beth", email: "denver_host_74646741@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/05a5b59a-bc9d-41a8-a0cc-516141341f5e.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["74646741"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_2461399@staylux.com" },
      update: {},
      create: { name: "Nadim", email: "denver_host_2461399@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/2461399/profile_pic/1337948180/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["2461399"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_42681856@staylux.com" },
      update: {},
      create: { name: "Seth", email: "denver_host_42681856@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/5c155f55-5a4b-4dd9-b30c-9e91b9b3c6f8.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["42681856"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_228639@staylux.com" },
      update: {},
      create: { name: "Daniel", email: "denver_host_228639@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ce6d33a5-0b98-4929-a38b-6b7268cadb94.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["228639"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_88175647@staylux.com" },
      update: {},
      create: { name: "Jim", email: "denver_host_88175647@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/8e6e592e-5864-4847-8bbf-33b55c34a773.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["88175647"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_124761061@staylux.com" },
      update: {},
      create: { name: "Nicole", email: "denver_host_124761061@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/5db817ea-bc2c-415b-8da6-b23ca3a85739.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["124761061"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_11512929@staylux.com" },
      update: {},
      create: { name: "David", email: "denver_host_11512929@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ccd36afc-1b93-467a-b0f1-fac7a60f76ae.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["11512929"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_236142905@staylux.com" },
      update: {},
      create: { name: "Rohini", email: "denver_host_236142905@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/bbed1537-9204-4fa6-a0f6-fb0cbe7e0c7c.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["236142905"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_15612930@staylux.com" },
      update: {},
      create: { name: "Peter", email: "denver_host_15612930@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e9175d5c-e26c-4332-8bb5-d0315d5f84a6.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["15612930"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_25591329@staylux.com" },
      update: {},
      create: { name: "Linda", email: "denver_host_25591329@staylux.com", hashedPassword: password, role: "HOST", image: "https://z0.muscache.cn/im/users/25591329/profile_pic/1420396301/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["25591329"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_243192607@staylux.com" },
      update: {},
      create: { name: "Jose", email: "denver_host_243192607@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1e34db87-be24-4e9b-959a-f395c0d191b7.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["243192607"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_146196004@staylux.com" },
      update: {},
      create: { name: "Timothy Scott", email: "denver_host_146196004@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/0ee64c39-e52f-4411-af71-369f2c98bd37.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["146196004"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_72589855@staylux.com" },
      update: {},
      create: { name: "Caleb", email: "denver_host_72589855@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User-72589855/original/0c8f1e84-e792-4240-9123-b5970bd2c09b.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["72589855"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_40540817@staylux.com" },
      update: {},
      create: { name: "Shannon", email: "denver_host_40540817@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/e6951616-2405-4eee-ae22-e3d43b27f9f3.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["40540817"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_31676476@staylux.com" },
      update: {},
      create: { name: "Katie", email: "denver_host_31676476@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/ab8f5948-8726-45b2-8c27-43b2a70d4e1f.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["31676476"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_45200960@staylux.com" },
      update: {},
      create: { name: "Thomas", email: "denver_host_45200960@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/d8a1d9b1-1c58-434b-af88-1a361352f45a.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["45200960"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_270246212@staylux.com" },
      update: {},
      create: { name: "Heather", email: "denver_host_270246212@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/1b9897c1-35fa-45d1-85e7-b3a406c3cc6b.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["270246212"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_185692705@staylux.com" },
      update: {},
      create: { name: "Christy", email: "denver_host_185692705@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/0c7107f5-5810-4fa4-af92-b42a44442270.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["185692705"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_5887477@staylux.com" },
      update: {},
      create: { name: "Amy", email: "denver_host_5887477@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/User/original/ef7e5f58-b514-46b6-964c-171b982c77d8.jpeg?aki_policy=profile_x_medium" },
    });
    hostMap["5887477"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_2177476@staylux.com" },
      update: {},
      create: { name: "Ben", email: "denver_host_2177476@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/users/2177476/profile_pic/1378274170/original.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["2177476"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_26864804@staylux.com" },
      update: {},
      create: { name: "Jennifer", email: "denver_host_26864804@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/f11f87a5-d076-4e64-9d02-169fe777c60d.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["26864804"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_275147129@staylux.com" },
      update: {},
      create: { name: "James", email: "denver_host_275147129@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/0c46a985-16b9-4395-80e4-c2f0e7e467d3.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["275147129"] = h.id;
  }
  {
    const h = await prisma.user.upsert({
      where: { email: "denver_host_12804331@staylux.com" },
      update: {},
      create: { name: "Matt", email: "denver_host_12804331@staylux.com", hashedPassword: password, role: "HOST", image: "https://a0.muscache.com/im/pictures/user/24d7c4c5-46ec-4fe7-aa05-784c06dd2357.jpg?aki_policy=profile_x_medium" },
    });
    hostMap["12804331"] = h.id;
  }
  console.log("Seeding Denver listings...");
  // 1. Beautiful Private Basement Suite near Downtown
  await prisma.listing.upsert({
    where: { slug: "beautiful-private-basement-suite-near-downtown-1733052" },
    update: {},
    create: {
      slug: "beautiful-private-basement-suite-near-downtown-1733052",
      title: "Beautiful Private Basement Suite near Downtown",
      description: "Beautifully remodeled basement suite in lovely Victorian home in central Denver.",
      propertyType: "APARTMENT",
      pricePerNight: 83.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/1572064c-06a6-432d-8a88-69823968d9ee.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cheesman Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73799,
      longitude: -104.97219,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 1711,
      hostId: hostMap["2416216"],
    },
  });
  // 2. Private Floor (860 sq ft) Self Check In
  await prisma.listing.upsert({
    where: { slug: "private-floor-860-sq-ft-self-check-in-14369542" },
    update: {},
    create: {
      slug: "private-floor-860-sq-ft-self-check-in-14369542",
      title: "Private Floor (860 sq ft) Self Check In",
      description: "Enjoy an entire 860 sq foot floor all to yourself in a newly built home. The space is on the 3rd floor and has a living room, a large bedroom, giant walk in closet, and a full bathroom. Bedroom and bathroom both have locking doors for privacy. Self check in for easy access!",
      propertyType: "APARTMENT",
      pricePerNight: 61.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/c48aa56e-f332-440e-8253-7df8deff9383.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.78556,
      longitude: -104.76256,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 1428,
      hostId: hostMap["88156830"],
    },
  });
  // 3. Sonder Zuni | Queen Studio Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-zuni-queen-studio-apartment-41451474" },
    update: {},
    create: {
      slug: "sonder-zuni-queen-studio-apartment-41451474",
      title: "Sonder Zuni | Queen Studio Apartment",
      description: "Say hello to the Mile High City at Zuni. These contemporary studios have a fully equipped kitchen, in-suite laundry, and a Roku for streaming. And you can catch a glimpse of the mountains from the rooftop terrace. Centered in the LoHi neighborhood, you'll have all the excitement of Downtown while being just far enough for a restful sleep. Surround yourself with colorful murals, unique eateries, and hoppy breweries. For wood-fired pizza heaven, Cart Driver is just around the corner.",
      propertyType: "APARTMENT",
      pricePerNight: 136.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-41451474/original/7d712912-85b2-4e0e-adb1-693cd59bd766.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7611,
      longitude: -105.01438,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.5,
      totalReviews: 1357,
      hostId: hostMap["219524979"],
    },
  });
  // 4. Historic Carriage House in Denver's Oldest Neighborhood
  await prisma.listing.upsert({
    where: { slug: "historic-carriage-house-in-denver-s-oldest-neighborhood-6333040" },
    update: {},
    create: {
      slug: "historic-carriage-house-in-denver-s-oldest-neighborhood-6333040",
      title: "Historic Carriage House in Denver's Oldest Neighborhood",
      description: "After being shutdown for 2 years, we are back and still rated Colorado's #1 best-loved airbnb! <br /><br />Privacy tucked in the back garden of a grand home.  Walking distance to breweries/restaurants. <br /><br />Near RiNo, with its craft breweries/restaurants. One mile to Denver's 16th Street Mall.<br /><br />12-minute walk from 38th and Blake Airport Train stop ($10.50 fare). Easy access to light-rail (1/2 block) & public scooters/bikes. 2023-BFN-0014894",
      propertyType: "CABIN",
      pricePerNight: 144.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-6333040/original/962094da-8134-46bb-a278-b2a476f1b82d.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "WASHER", "GYM", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "BBQ_GRILL", "AIR_CONDITIONING", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76154,
      longitude: -104.9741,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 5.0,
      totalReviews: 1170,
      hostId: hostMap["32967501"],
    },
  });
  // 5. Cozy Central Denver Suite with Private Entrance
  await prisma.listing.upsert({
    where: { slug: "cozy-central-denver-suite-with-private-entrance-10237203" },
    update: {},
    create: {
      slug: "cozy-central-denver-suite-with-private-entrance-10237203",
      title: "Cozy Central Denver Suite with Private Entrance",
      description: "We invite you to our contemporary basement suite in our centrally located historic Denver home.  With a private side entrance and full bathroom, you'll have the space to yourself. The location provides easy and quick access to all areas of Denver. Our Business Tax ID # 343466.<br /><br />Now outfitted with a new mattress as of Sept 2021!<br /><br />We are practicing all recommended Airbnb cleaning guidelines. We also provide cleaning products in the suite for your use if desired.",
      propertyType: "CABIN",
      pricePerNight: 76.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/bd2dc258-ffd6-4836-83e5-1a35cd31a9dc.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73208,
      longitude: -104.94793,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 972,
      hostId: hostMap["36757616"],
    },
  });
  // 6. Artisan Loft in Historic Five Points with Rustic Red Bricks
  await prisma.listing.upsert({
    where: { slug: "artisan-loft-in-historic-five-points-with-rustic-red-bricks-22515364" },
    update: {},
    create: {
      slug: "artisan-loft-in-historic-five-points-with-rustic-red-bricks-22515364",
      title: "Artisan Loft in Historic Five Points with Rustic Red Bricks",
      description: "Explore Denver's art district, then climb the steel stairs to this eclectic loft where vintage charm meets steam-punk fashion. Portuguese-style patterned tiles blend seamlessly with a bottle top coffee table and industrial-chic lighting.<br /><br />This space was a family project (Steve, Lisa and Mick  who are brothers and sister) \u2013 a carriage house built behind our 1900s house near downtown Denver. The building was designed to mimic older architecture to fit-in with the historic neighborhood. The interior was designed to carry that vintage charm inside with exposed brick and steam-punk fixtures and furniture to blend vintage and industrial design elements. We designed and built the structure including detail such as the black pipe chandelier, steel stair case and funky locker cabinets in the bathroom and bedrooms.  Handcrafted items and collections from our family are displayed around the house.<br /><br />The carriage house is exclusively for guests so anything you see is available i",
      propertyType: "CABIN",
      pricePerNight: 203.0,
      cleaningFee: 30,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/4d66ba3e-76b4-4f4d-a227-c00d0db98b7e.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PET_FRIENDLY", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "PARKING", "WORKSPACE", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76097,
      longitude: -104.97516,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 910,
      hostId: hostMap["165269170"],
    },
  });
  // 7. Suite with Private Bath and Roof Deck! Near Train!
  await prisma.listing.upsert({
    where: { slug: "suite-with-private-bath-and-roof-deck-near-train-26007543" },
    update: {},
    create: {
      slug: "suite-with-private-bath-and-roof-deck-near-train-26007543",
      title: "Suite with Private Bath and Roof Deck! Near Train!",
      description: "Private room- not a whole home rental. There is a kitten that lives here. <br /><br />This quiet, bright and plant-filled home provides you with the master suite, including private roof access from your room and your own ensuite bathroom with rain shower head and tub. <br /><br />Street parking is free.<br /><br />If you want to get into the mountains or Red Rocks, this location avoids all the downtown traffic! Light rail to downtown is 2 blocks (less than 5 minutes) from the front door.<br /><br />No refunds for cat allergies.",
      propertyType: "APARTMENT",
      pricePerNight: 70.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/9fcb4cb9-2bc1-4537-89eb-756364e37438.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "West Colfax, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73528,
      longitude: -105.04352,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 889,
      hostId: hostMap["20461002"],
    },
  });
  // 8. Newly Renovated, Garden-level Studio near the City
  await prisma.listing.upsert({
    where: { slug: "newly-renovated-garden-level-studio-near-the-city-15831072" },
    update: {},
    create: {
      slug: "newly-renovated-garden-level-studio-near-the-city-15831072",
      title: "Newly Renovated, Garden-level Studio near the City",
      description: "Our recently renovated garden-level or basement studio is the lower portion of our charming Denver bungalow home located on a quiet tree-lined street in the popular and centrally located Whittier neighborhood near beautiful City Park.  Once inside the shared backdoor of the house, you\u2019ll go down a few steps to access your private entrance to your own self-contained, non-smoking, clean space featuring a beautiful kitchenette and attached bathroom.",
      propertyType: "CABIN",
      pricePerNight: 87.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/4b3847e2-b0fc-4a8b-84b3-8ffcd236e863.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75703,
      longitude: -104.96115,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 873,
      hostId: hostMap["55376910"],
    },
  });
  // 9. One Night Minimum, City/Mtns Cozy Garden Level Apt
  await prisma.listing.upsert({
    where: { slug: "one-night-minimum-city-mtns-cozy-garden-level-apt-21080559" },
    update: {},
    create: {
      slug: "one-night-minimum-city-mtns-cozy-garden-level-apt-21080559",
      title: "One Night Minimum, City/Mtns Cozy Garden Level Apt",
      description: "License #R372700. Private entrance, side of the house. Private garden level space with lots of natural light. AC. Comfy queen size bed in the bedroom & a high quality futon couch that folds to a queen size bed in the living room. Bath has lots of hot water & great pressure. 5-10 minute walk to the light rail! 4 blocks from Old South Pearl district with shops, bars and restaurants - & Wash Park for exercise & people watching! Cool neighborhoods, too! 10 minutes to downtown or to DTC! Come enjoy!",
      propertyType: "APARTMENT",
      pricePerNight: 56.0,
      cleaningFee: 8,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/26d84d53-381b-4598-9ec6-140c30a54c65.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68803,
      longitude: -104.97626,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.84,
      totalReviews: 883,
      hostId: hostMap["113264940"],
    },
  });
  // 10. Basement Bungalow
  await prisma.listing.upsert({
    where: { slug: "basement-bungalow-17185409" },
    update: {},
    create: {
      slug: "basement-bungalow-17185409",
      title: "Basement Bungalow",
      description: "Need a place to crash and dash? Visiting family but need your own space? In town for job interview? <br />Perfect location for getting around town. Private basement studio apartment with self check-in and separate entry from main house.<br /><br />Extra Services:<br />$35 Pet fee<br />$35 Early (Noon)  or Late (1 pm) Check-in/out <br />Be sure to message me if your trip is dependent on this service. 24 hour notice/cancellation required.",
      propertyType: "CABIN",
      pricePerNight: 76.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/8e8ef382-c1e1-4cbc-98e9-225fdd0a457d.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "WIFI", "PET_FRIENDLY", "DRYER", "PARKING", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75025,
      longitude: -104.97276,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 876,
      hostId: hostMap["53312831"],
    },
  });
  // 11. Sunny Cottage in the Historic and Trendy LoHi Neighborhood
  await prisma.listing.upsert({
    where: { slug: "sunny-cottage-in-the-historic-and-trendy-lohi-neighborhood-7931953" },
    update: {},
    create: {
      slug: "sunny-cottage-in-the-historic-and-trendy-lohi-neighborhood-7931953",
      title: "Sunny Cottage in the Historic and Trendy LoHi Neighborhood",
      description: "Two bedroom one bath clean, restored historic home in Lower Highland\u2014LoHi\u2014a family-friendly, safe, pleasant neighborhood. Great restaurants are within a quick and enjoyable walk. The Platte River jogging trail is just down the hill, and the central business district and Union station are a 1.5 mile easy walk through cute historic neighborhoods.<br /><br />We are glad to assist you in any way you need during your stay. We are especially happy to make recommendations in terms of what to do or where to eat.",
      propertyType: "APARTMENT",
      pricePerNight: 98.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-7931953/original/218b697b-f287-4f34-8546-9cb53acc1458.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "TV", "PET_FRIENDLY", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "PARKING", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76082,
      longitude: -105.01858,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 816,
      hostId: hostMap["6065807"],
    },
  });
  // 12. Light filled, homey, quiet & private unit
  await prisma.listing.upsert({
    where: { slug: "light-filled-homey-quiet-private-unit-23685442" },
    update: {},
    create: {
      slug: "light-filled-homey-quiet-private-unit-23685442",
      title: "Light filled, homey, quiet & private unit",
      description: "Come stay with us! Your private home away from home styled to feel like you are staying at a family or friend's house. And, we have included all those little things that you may have forgotten to pack. That homey feeling is reinforced by the view out the windows of the private backyard. The unit has its own covered entrance and free parking in the driveway. <br /><br />Located 3.3 miles east of downtown Denver. An easy trip to the mountains, Red Rocks, or the airport 22 minutes from here, via I-70",
      propertyType: "APARTMENT",
      pricePerNight: 67.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-23685442/original/b2b58255-3daf-48fc-a857-97e48be2017c.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "North Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75641,
      longitude: -104.92436,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 793,
      hostId: hostMap["20045562"],
    },
  });
  // 13. Cozy, Private, Spacious Bedroom and Bathroom
  await prisma.listing.upsert({
    where: { slug: "cozy-private-spacious-bedroom-and-bathroom-6348993" },
    update: {},
    create: {
      slug: "cozy-private-spacious-bedroom-and-bathroom-6348993",
      title: "Cozy, Private, Spacious Bedroom and Bathroom",
      description: "Whether in town for the weekend, a week, or all month long, this space has all you need for a great Denver experience. In a very walk-able neighborhood that is only a few minute bus ride into downtown, you'll find restaurants, bars and coffee shops available right outside the front door. This listing also features a comfortable, enclosed, 420-friendly patio.",
      propertyType: "APARTMENT",
      pricePerNight: 62.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/70c4d677-e740-44d2-8b2f-4c24754650f8.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "FIREPLACE", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "HEATING", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77037,
      longitude: -105.0135,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 786,
      hostId: hostMap["28359129"],
    },
  });
  // 14. Boutique Studio | Walk to Bars | Couples Retreat
  await prisma.listing.upsert({
    where: { slug: "boutique-studio-walk-to-bars-couples-retreat-22336069" },
    update: {},
    create: {
      slug: "boutique-studio-walk-to-bars-couples-retreat-22336069",
      title: "Boutique Studio | Walk to Bars | Couples Retreat",
      description: "One of the hottest neighborhoods in the city! Just 3 blocks from Denver's number one rated restaurant Hop Alley, RiNo Beer Garden, and walkable/bikable to any other place you may desire to go! Plus, if you're a Harry Potter fan, we may have a few fun quirks that will light you up!<br /><br />\u2022 Huge walk in shower with rain shower head<br />\u2022 Gorgeous kitchen<br />\u2022 Queen bed + couch and blow up mattress <br />\u2022 Private patio space<br />\u2022 Perfect, walkable location <br />\u2022 350 square feet<br /><br />CO Short Term Rental ID: 446542",
      propertyType: "CABIN",
      pricePerNight: 92.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/328fd1e1-307d-424c-ae45-237c0375ee9a.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "WIFI", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76603,
      longitude: -104.97177,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.58,
      totalReviews: 834,
      hostId: hostMap["724381"],
    },
  });
  // 15. LoHi Secret Garden at Mulberry at Denver Cottages
  await prisma.listing.upsert({
    where: { slug: "lohi-secret-garden-at-mulberry-at-denver-cottages-39405" },
    update: {},
    create: {
      slug: "lohi-secret-garden-at-mulberry-at-denver-cottages-39405",
      title: "LoHi Secret Garden at Mulberry at Denver Cottages",
      description: "Enjoy our oasis in the city and stay at one of the founding Airbnb rentals.  <br />We love to enjoy the famous Colorado weather and believe in indoor & outdoor living.  We are located next to downtown and in the revitalized neighborhood of lower highlands.<br />Short walks to coffee shops, restaurants & microbrews, dispensary, Bug Theater & downtown. <br />We are 420 (outdoors only), LBGTQ friendly, allergy-free, fragrance-free & pet-free. UVC w/ Ozone sterilization.",
      propertyType: "CABIN",
      pricePerNight: 140.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/c1686c33-4efa-4010-9c60-38ee01d76514.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "HOT_TUB", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76605337851223,
      longitude: -105.00307815462764,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 771,
      hostId: hostMap["666"],
    },
  });
  // 16. West Highlands Home - perfect for couples
  await prisma.listing.upsert({
    where: { slug: "west-highlands-home-perfect-for-couples-13194349" },
    update: {},
    create: {
      slug: "west-highlands-home-perfect-for-couples-13194349",
      title: "West Highlands Home - perfect for couples",
      description: "This quiet home is conveniently located (84- Walk score) in the hip West Highlands neighborhood - adjacent to Tennyson street. There are over 50 restaurants, coffee shops, and bars within a mile radius with a diverse range. You'll be less than 5 blocks from two natural grocery stores wine and liquor stores, 1 mile from Sloan's lake, a 10 minute Lyft ride from downtown Denver, and 25 minutes from Red Rocks. Perfect for couples or individuals looking for a peaceful stay in a relaxing environment.",
      propertyType: "CABIN",
      pricePerNight: 87.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-13194349/original/31f0d1ae-1980-4311-8ba2-a89e40dc204a.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76337,
      longitude: -105.04369,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 761,
      hostId: hostMap["50847379"],
    },
  });
  // 17. Central Location! Cute & Cozy Basement Apartment
  await prisma.listing.upsert({
    where: { slug: "central-location-cute-cozy-basement-apartment-13447168" },
    update: {},
    create: {
      slug: "central-location-cute-cozy-basement-apartment-13447168",
      title: "Central Location! Cute & Cozy Basement Apartment",
      description: "NO EARLY CHECK-IN, LATE CHECK-OUT, OR LUGGAGE HOLDS. Please plan accordingly!<br /><br />My place is close to City Park, RTD bus route, Denver Zoo, museums, and 2 miles from Downtown. It is good for couples, solo adventurers, business travelers, & families (with kids).<br /><br />We are a family of 4 (+Big dog) living upstairs. <br /><br />Basement apartment with large bedroom, bathroom, and kitchenette. Modern furniture & accessories mixed with vintage and thrifted finds give our place a fun eclectic feel.",
      propertyType: "CABIN",
      pricePerNight: 84.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/efa2e73b-e240-47a0-b73a-54941a3d8b6c.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Skyland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76155,
      longitude: -104.95486,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 743,
      hostId: hostMap["48448059"],
    },
  });
  // 18. Sonder The Artesian | Queen Studio Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-the-artesian-queen-studio-apartment-920150158837629495" },
    update: {},
    create: {
      slug: "sonder-the-artesian-queen-studio-apartment-920150158837629495",
      title: "Sonder The Artesian | Queen Studio Apartment",
      description: "Location is everything for this industrial-chic property. The Artesian is next door to the best bars and restaurants in LoHi. The unique exterior features paneled steel and rectangular windows for plenty of natural light. Each modern apartment includes a fully equipped kitchenette and Roku TV for streaming. Should you need to freshen your luggage, complimentary laundry rooms are available. Stay at The Artesian for the aesthetic, comfort, and convenience in Denver's hottest neighborhood.",
      propertyType: "APARTMENT",
      pricePerNight: 108.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-920150158837629495/original/c6e07623-e9b3-4cba-91a7-50b8a945c99a.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76346,
      longitude: -105.00993,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.69,
      totalReviews: 774,
      hostId: hostMap["219524979"],
    },
  });
  // 19. Urban Cottage in Downtown Denver
  await prisma.listing.upsert({
    where: { slug: "urban-cottage-in-downtown-denver-35284634" },
    update: {},
    create: {
      slug: "urban-cottage-in-downtown-denver-35284634",
      title: "Urban Cottage in Downtown Denver",
      description: "Welcome to the Colter Cottage - urban cottage meets European charm. Come stay in our beautiful carriage house in the heart of downtown Denver. The home is walking distance from South Broadway\u2019s night life, Washington Park, and many quaint shops/restaurants. 2 blocks from the Cherry Creek Trail gives you access to running trails & a 15 minute bike ride to Union Station and Coors Field. 45 minutes to the mountains and an hour and a half from the ski slopes!",
      propertyType: "CABIN",
      pricePerNight: 142.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/590c3404-1cc2-4738-a934-6f41098bf612.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7165,
      longitude: -104.98187,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 723,
      hostId: hostMap["114332015"],
    },
  });
  // 20. Greet the Friendly Backyard Chickens 5 Minutes from Downtown
  await prisma.listing.upsert({
    where: { slug: "greet-the-friendly-backyard-chickens-5-minutes-from-downtown-13449331" },
    update: {},
    create: {
      slug: "greet-the-friendly-backyard-chickens-5-minutes-from-downtown-13449331",
      title: "Greet the Friendly Backyard Chickens 5 Minutes from Downtown",
      description: "Take it easy in front of the 65-inch curved TV at a light-filled getaway with warm, modern design and a luxe marble shower. The private, fenced-in yard with resident chickens sets the scene for leisurely alfresco dinners in peaceful surroundings.",
      propertyType: "APARTMENT",
      pricePerNight: 135.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/monet/Select-13449331/original/16489a4f-6f67-46aa-8a8f-df93c8017ab8", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77165,
      longitude: -105.02229,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 718,
      hostId: hostMap["14949477"],
    },
  });
  // 21. Private Intuitive Suite - Sleeps 1-8 (10 min-DIA)
  await prisma.listing.upsert({
    where: { slug: "private-intuitive-suite-sleeps-1-8-10-min-dia-26201544" },
    update: {},
    create: {
      slug: "private-intuitive-suite-sleeps-1-8-10-min-dia-26201544",
      title: "Private Intuitive Suite - Sleeps 1-8 (10 min-DIA)",
      description: "\u2b07\ufe0fIMPORTANT! PLEASE READ ALL INFO\u2b07\ufe0f<br />\ud83d\udc4bCheck in starts at 2:00PM, checkout by 10:00AM<br />\ud83c\udf3fPrivate basement mini-apartment<br />\ud83d\udc6e\ud83c\udffc\u200d\u2640\ufe0fDenver law requires hosts on home premises too<br />\ud83d\udc31Hosts/cats on main levels of home - PLEASE do not hold or block doors open<br />\u274cNot 420, drug, smoking or vape friendly<br />\u274cGuest area only (no outside or host area loitering)<br />\u274cNo refunds for not reading these descriptions and rules before booking<br />\u274cPlease accurately report party size when booking<br />\u274cPlease read all house rules before booking.",
      propertyType: "CABIN",
      pricePerNight: 137.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 8,
      bedrooms: 2,
      bathrooms: 1,
      beds: 6,
      images: ["https://a0.muscache.com/pictures/2219370c-6450-43d7-ae7f-c8b33819afbd.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.79334200616132,
      longitude: -104.7992644504109,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 722,
      hostId: hostMap["196667037"],
    },
  });
  // 22. Walk to Mile High Stadium & Downtown Denver!
  await prisma.listing.upsert({
    where: { slug: "walk-to-mile-high-stadium-downtown-denver-25586560" },
    update: {},
    create: {
      slug: "walk-to-mile-high-stadium-downtown-denver-25586560",
      title: "Walk to Mile High Stadium & Downtown Denver!",
      description: "Our guesthouse is the perfect location for exploring the city. We're  just a few blocks from Mile High Stadium and walking distance to many restaurants, breweries, and Denver City attractions. You will have complete privacy, your own off-street parking space, and all the amenities you need for a comfortable stay.",
      propertyType: "CABIN",
      pricePerNight: 109.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/c31312d8-929c-4379-a3be-0de1d5ff5ead.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Jefferson Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75107,
      longitude: -105.01829,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 696,
      hostId: hostMap["107511912"],
    },
  });
  // 23. Newly Renovated Apartment Near DU
  await prisma.listing.upsert({
    where: { slug: "newly-renovated-apartment-near-du-7776227" },
    update: {},
    create: {
      slug: "newly-renovated-apartment-near-du-7776227",
      title: "Newly Renovated Apartment Near DU",
      description: "Walk the secret garden pathway to your private 2-bedroom, 1-bath, kitchenette retreat. The space is clean, airy, tasteful, charming, with wooden floors, lovely linens, and restful colors. Convenient public transportation to downtown Denver and light rail is just outside the door. Welcome to your retreat in the city! We are LGBTQ+ friendly.",
      propertyType: "APARTMENT",
      pricePerNight: 90.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/98923346/8e8a7752_original.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "KITCHEN", "SMOKE_ALARM", "TV"],
      address: "Wellshire, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.65685,
      longitude: -104.95886,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 705,
      hostId: hostMap["13416841"],
    },
  });
  // 24. Denver's Urban Oasis + Hot Tub
  await prisma.listing.upsert({
    where: { slug: "denver-s-urban-oasis-hot-tub-9633450" },
    update: {},
    create: {
      slug: "denver-s-urban-oasis-hot-tub-9633450",
      title: "Denver's Urban Oasis + Hot Tub",
      description: "Enjoy my stylish home in Jefferson Park, one of the coolest neighborhoods in Denver - steps from downtown, walking distance to Denver Broncos' Empower Field, nearby Meow Wolf, the Highlands, LoHi, and many of the city's best restaurants and attractions.",
      propertyType: "APARTMENT",
      pricePerNight: 181.0,
      cleaningFee: 27,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/9c9529ba-b6ad-4c8a-b5bc-1addf3cbeb4b.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "EV_CHARGER", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "HOT_TUB", "WASHER", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "TV", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "SMOKE_ALARM"],
      address: "Jefferson Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75527,
      longitude: -105.02229,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 683,
      hostId: hostMap["16072418"],
    },
  });
  // 25. Elegant Flat in Denver's hottest neighborhood
  await prisma.listing.upsert({
    where: { slug: "elegant-flat-in-denver-s-hottest-neighborhood-16087125" },
    update: {},
    create: {
      slug: "elegant-flat-in-denver-s-hottest-neighborhood-16087125",
      title: "Elegant Flat in Denver's hottest neighborhood",
      description: "My home is part of the Curtis Park Historic District.  And, art, breweries, coffee, and dining are just steps away.  Access to the light rail (4 blocks), train to DIA very close,  B-cycle(rental bikes - 3 blocks), Coors Field is a 20 minute walk, all downtown amenities are within walking distance or a $5 UBER or Lyft ride. Bagels at Rosenberg's(the BEST) are 4 blocks away. My Short Term Rental (STR) license is: 2024-RENEW-0006796",
      propertyType: "APARTMENT",
      pricePerNight: 160.0,
      cleaningFee: 24,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/7df7d921-fea5-4490-8326-5bbf1245f0e0.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75798,
      longitude: -104.98108,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 680,
      hostId: hostMap["93197703"],
    },
  });
  // 26. Steps to Convention Center + Breakfast. Pool. Gym.
  await prisma.listing.upsert({
    where: { slug: "steps-to-convention-center-breakfast-pool-gym-869473170179660442" },
    update: {},
    create: {
      slug: "steps-to-convention-center-breakfast-pool-gym-869473170179660442",
      title: "Steps to Convention Center + Breakfast. Pool. Gym.",
      description: "Stay in the heart of downtown Denver at Homewood Suites, just steps from the Colorado Convention Center, 16th Street Mall, and top attractions. Enjoy spacious suites with full kitchens, free hot breakfast, and complimentary Wi-Fi. Unwind at the indoor pool, maintain your routine in the fitness center, and bring your pet along for the trip. Perfect for extended stays, business travelers, and city explorers seeking convenience and comfort in the Mile High City.",
      propertyType: "APARTMENT",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-869473170179660442/original/4872e46c-f89f-43e1-b931-afd9f12988ab.png", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "POOL", "HEATING", "AIR_CONDITIONING", "WIFI", "HOT_TUB", "DRYER", "PARKING", "KITCHEN", "WORKSPACE", "WASHER", "SMOKE_ALARM", "GYM", "TV"],
      address: "CBD, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.742079504005595,
      longitude: -104.99287029964533,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.76,
      totalReviews: 703,
      hostId: hostMap["492297949"],
    },
  });
  // 27. Beautiful Denver Park Hill 2 BR Apartment
  await prisma.listing.upsert({
    where: { slug: "beautiful-denver-park-hill-2-br-apartment-14010321" },
    update: {},
    create: {
      slug: "beautiful-denver-park-hill-2-br-apartment-14010321",
      title: "Beautiful Denver Park Hill 2 BR Apartment",
      description: "Beautiful and specious 2 BR/1 Bath converted basement apartment near down town with separate entrance.  It fits 4 comfortably. Not only is our home part of the lovely North Park Hill neighborhood, but it's conveniently situated 4 miles from down town Denver where you can enjoy shopping, restaurants and nightlife that Denver has to offer.<br />Mini fridge, microwave, toaster oven, coffee maker, WIFI, Philo TV, Netflix, Hulu, Roku & much more!",
      propertyType: "APARTMENT",
      pricePerNight: 97.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-14010321/original/118aba8d-8f0b-45a4-be11-e206196d2c40.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "North Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75859,
      longitude: -104.91988,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.78,
      totalReviews: 700,
      hostId: hostMap["69009301"],
    },
  });
  // 28. Wonderfully Restored 1893 Victorian Bedroom
  await prisma.listing.upsert({
    where: { slug: "wonderfully-restored-1893-victorian-bedroom-14724270" },
    update: {},
    create: {
      slug: "wonderfully-restored-1893-victorian-bedroom-14724270",
      title: "Wonderfully Restored 1893 Victorian Bedroom",
      description: "This lovely Victorian home is close to Downtown Denver, the Convention Center, Coors Field, 16th Street Mall and Light Rail in addition to tons of trendy restaurants and Union Station. You\u2019ll love the high ceilings, custom kitchen, comfy bed, proximity to downtown, classic Victorian feel, hardwood floors, and the overall coziness.",
      propertyType: "APARTMENT",
      pricePerNight: 58.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/cc948dc8-8eae-4f72-bc31-bf1d3c60b7fe.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75258,
      longitude: -104.98143,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 684,
      hostId: hostMap["47421139"],
    },
  });
  // 29. Spacious, bright and beautiful home in RiNo
  await prisma.listing.upsert({
    where: { slug: "spacious-bright-and-beautiful-home-in-rino-7577128" },
    update: {},
    create: {
      slug: "spacious-bright-and-beautiful-home-in-rino-7577128",
      title: "Spacious, bright and beautiful home in RiNo",
      description: "A spacious, contemporary,  renovated 1886 home. Perfect for couples, business travelers, and small families. Full bathrooms for each bedroom (king & queen size beds). Modern kitchen opens to a back patio/BBQ.  Ecofriendly low scent products used. Located in the popular Curtis Park/RiNo area easy walk to:<br />- 30 min train ride to DIA airport<br />- 25 min to Red Rocks Amphitheatre<br />- 20+ breweries & distilleries<br />- 40+ retailers and boutiques<br />- 30 art galleries<br />-5 music venues <br />- 75+ restaurants and bars",
      propertyType: "APARTMENT",
      pricePerNight: 229.0,
      cleaningFee: 34,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/b8fe1f94-fb6d-457c-9633-00986212c9bf.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76267,
      longitude: -104.97346,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 672,
      hostId: hostMap["8066753"],
    },
  });
  // 30. RiNo Den
  await prisma.listing.upsert({
    where: { slug: "rino-den-4753876" },
    update: {},
    create: {
      slug: "rino-den-4753876",
      title: "RiNo Den",
      description: "In the heart of Denver's RiNo Art District and located in the Denver Ballpark Neighborhood.  The best of Denver Entertainment, Dining, Sports, Nightlife and Shopping at your fingertips.  Private access and parking which includes patio.  Note - it is alley access and stairs are quite narrow.",
      propertyType: "APARTMENT",
      pricePerNight: 84.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/cdd02bd3-0821-4166-9df0-8dd5e9bd1b17.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7574,
      longitude: -104.98677,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 686,
      hostId: hostMap["24532369"],
    },
  });
  // 31. parkside5280
  await prisma.listing.upsert({
    where: { slug: "parkside5280-2467260" },
    update: {},
    create: {
      slug: "parkside5280-2467260",
      title: "parkside5280",
      description: "Recently remodeled 2 bedroom, clean, garden level basement apartment in FANTASTIC location.  Less than one block off City Park and steps from the Denver Zoo, Denver Museum of Nature & Science, Denver Botanic Gardens, and several local coffee shops, bars, and restaurants (walk score=83).  Downtown Denver is a 2.5 mile $10-15 Uber/Lyft ride away and there are two bus lines that within a block that will take you directly downtown.  Live like a Denverite in the Bluebird District of City Park!",
      propertyType: "CABIN",
      pricePerNight: 141.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/04843b6b-4497-470b-a2c2-3ded588d065f.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "City Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74241,
      longitude: -104.95097,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 670,
      hostId: hostMap["11000035"],
    },
  });
  // 32. Modern Historic Denver Carriage House with Hot tub
  await prisma.listing.upsert({
    where: { slug: "modern-historic-denver-carriage-house-with-hot-tub-4236002" },
    update: {},
    create: {
      slug: "modern-historic-denver-carriage-house-with-hot-tub-4236002",
      title: "Modern Historic Denver Carriage House with Hot tub",
      description: "This stylish carriage house is in tree-lined Park Hill. <br /><br />\u2022 2 miles from the Denver Zoo and the Museum of Nature & Science, and 5-minute walk to bakery, coffee shops, and casual and fine dining. <br />\u2022 Walk one block to catch the bus to downtown Denver and check out 16th Street Mall, the Convention Center, Larimer Square, and the Pepsi Center. <br />\u2022 2 Bicycles included!<br /><br />*Photos taken by happy guests @therollingvan, check them out on Instagram!",
      propertyType: "CABIN",
      pricePerNight: 110.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/e7e29176-de83-4e4a-ad69-871c9b030fb7.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "HOT_TUB", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "North Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7524,
      longitude: -104.92175,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.85,
      totalReviews: 680,
      hostId: hostMap["21982508"],
    },
  });
  // 33. The Cottage at Seahorse Heights
  await prisma.listing.upsert({
    where: { slug: "the-cottage-at-seahorse-heights-16548314" },
    update: {},
    create: {
      slug: "the-cottage-at-seahorse-heights-16548314",
      title: "The Cottage at Seahorse Heights",
      description: "All are welcome to enjoy a spacious mid-century cottage in Congress Park.  Make yourself at home with our full kitchen, private bedroom, sunny reading room, and light filled living/dining room with gas fire place.  This older carriage house shares a private yard with an 1890s Victorian home built by Denver's Meininger family.",
      propertyType: "CABIN",
      pricePerNight: 122.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/4bffbfa5-2d90-4de1-b465-a747b58e93a4.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73344421386719,
      longitude: -104.95793151855469,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 678,
      hostId: hostMap["68062201"],
    },
  });
  // 34. Downtown Denver Oasis with HOT TUB
  await prisma.listing.upsert({
    where: { slug: "downtown-denver-oasis-with-hot-tub-19503543" },
    update: {},
    create: {
      slug: "downtown-denver-oasis-with-hot-tub-19503543",
      title: "Downtown Denver Oasis with HOT TUB",
      description: "Our 3 beds 2 baths , one of a kind apartment is very unique and comfortable. Located in the heart of historical Capitol Hill on Main Street in very lively neighborhood. Urban with fabulous outdoor bars on both sides . Huge Garden Patio with a Brand new, all year long hot tub . Good for family trips , work trips , single & friends gateways and small gatherings . No dogs ! No early check in ! No late check out ! Ask additional questions :)",
      propertyType: "APARTMENT",
      pricePerNight: 201.0,
      cleaningFee: 30,
      serviceFee: 0,
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 7,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-19503543/original/fa4a53c0-c09c-4611-aa22-c4de635e67c1.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "WIFI", "SECURITY_CAMERAS", "HOT_TUB", "WASHER", "FIREPLACE", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74124,
      longitude: -104.9716,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.79,
      totalReviews: 682,
      hostId: hostMap["49223382"],
    },
  });
  // 35. Full of Character AND Comfortable !
  await prisma.listing.upsert({
    where: { slug: "full-of-character-and-comfortable-4294257" },
    update: {},
    create: {
      slug: "full-of-character-and-comfortable-4294257",
      title: "Full of Character AND Comfortable !",
      description: "This private 800 sq ft apartment is located on the first floor of a three-story home built in 1897. While its history can be seen in the exposed brick, cast iron tub and ornate woodwork, the space has been modernized to ensure your comfort during your stay.  WiFi, TV with Chromecast and movies, and other modern amenities will make your stay comfortable and like your own home!",
      propertyType: "APARTMENT",
      pricePerNight: 127.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-4294257/original/c4ed1730-0d66-4f6c-8f9e-c61eceaab8bf.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73884825718342,
      longitude: -104.949571507518,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 657,
      hostId: hostMap["22292048"],
    },
  });
  // 36. Cozy&Spacious 2Bed Gem: Private, Kitchen, Near DIA
  await prisma.listing.upsert({
    where: { slug: "cozy-spacious-2bed-gem-private-kitchen-near-dia-21796586" },
    update: {},
    create: {
      slug: "cozy-spacious-2bed-gem-private-kitchen-near-dia-21796586",
      title: "Cozy&Spacious 2Bed Gem: Private, Kitchen, Near DIA",
      description: "Modern apartment w/ all new furnishings! 2 bed, 1 bath,  full kitchen, living & dining w/ 2 fireplaces & private entrance! Fast wifi Inc. Close to all Denver has to offer. 15 mins from airport, 15 mins to Children's & Univ. Hospital, within 30 mins of downtown, zoo, aquarium, museums, conv. center and sporting events. Light rail station & lots of fast food & sit down restaurants within 2 miles. Come stay for a night or a week; you'll have everything needed in this home away from home!",
      propertyType: "CABIN",
      pricePerNight: 99.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 7,
      bedrooms: 2,
      bathrooms: 1,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/70e8393d-4b7b-4cec-aa42-8001f7e4b7bf.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "EV_CHARGER", "HEATING", "BBQ_GRILL", "WIFI", "FIREPLACE", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.775227672997616,
      longitude: -104.75148873328217,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 645,
      hostId: hostMap["74368861"],
    },
  });
  // 37. Admire the Eclectic Aesthetic at a Historic City Sanctuary
  await prisma.listing.upsert({
    where: { slug: "admire-the-eclectic-aesthetic-at-a-historic-city-sanctuary-21151336" },
    update: {},
    create: {
      slug: "admire-the-eclectic-aesthetic-at-a-historic-city-sanctuary-21151336",
      title: "Admire the Eclectic Aesthetic at a Historic City Sanctuary",
      description: "Soak up the vintage charm of this basement hideaway built by a silver baron in 1891, featuring original red brick walls and oriental rugs. Old England meets the Wild West, while mementos from international travels add even more character.<br /><br />We will keep you safe during your visit. We have a dedicated professional cleaner for the apartment, who cleans and disinfects between guests based on CDC guidelines. There are sanitizers and cleaning supplies for your use in the apartment, and you need never meet us.<br /><br />The apartment is part of the original basement from 1891, so it has exposed granite exterior walls and interior brick walls.  The apartment includes a newly renovated kitchen and bathroom, new heating, tile floors, oriental carpets, and a new (firm) bed. Air conditioning was installed in July 2019 to keep you cool.<br /><br />The apartment is decorated with Colorado antiques, with the exception of the new bed and new sofa bed.  Much like when the house was originall",
      propertyType: "APARTMENT",
      pricePerNight: 120.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/b730a90e-a8c3-499d-8dad-5cef4ac13e4b.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Cheesman Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73947,
      longitude: -104.96051,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 647,
      hostId: hostMap["151512284"],
    },
  });
  // 38. Andrew's Arts and Sports House
  await prisma.listing.upsert({
    where: { slug: "andrew-s-arts-and-sports-house-31168188" },
    update: {},
    create: {
      slug: "andrew-s-arts-and-sports-house-31168188",
      title: "Andrew's Arts and Sports House",
      description: "Beautiful Mid Century Modern Blond Brick Home in Denver\u2019s North Park Hill location.<br /><br />Happy to provide meals for a small fee.<br />$10 for breakfast <br />$15 for lunch <br />$20 for dinner <br />per guest<br /><br />35.00 to add a third adult guest for one night. <br /><br />Happy to lead Arts and Sports activities for guests! <br /><br />See the space section for more information on surrounding activities.",
      propertyType: "APARTMENT",
      pricePerNight: 61.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-31168188/original/99f5206f-7acf-402e-8f48-7ab033deab6a.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Northeast Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7691,
      longitude: -104.92721,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 652,
      hostId: hostMap["232970198"],
    },
  });
  // 39. Hip Rino Basement Suite Near Downtown
  await prisma.listing.upsert({
    where: { slug: "hip-rino-basement-suite-near-downtown-8071897" },
    update: {},
    create: {
      slug: "hip-rino-basement-suite-near-downtown-8071897",
      title: "Hip Rino Basement Suite Near Downtown",
      description: "Select some vinyl to put on the record player and settle down by the fire for some retro entertainment. This remodeled 850-square-foot property comes with mid-century modern touches, and there's a shared backyard with BBQ grill.<br /><br />Large kitchenette comes complete with microwave, toaster oven, single burner, large refrigerator, coffee maker, & all pots, pans, plates, utensils, etc. Head outside to the backyard and throw something on the grill for dinner.<br /><br />Turn on the fan and open up the windows for a cool breeze on summer nights. Heat control in the winter.<br /><br />Newly remodeled  850 sqft basement apartment, spacious and nice. The kitchenette has a fridge, toaster oven, microwave, coffee maker, hot plate, sink, and all necessary plates, cups, bowls, silverware, etc. Please let us know if there is anything you need that you don't see!<br /><br />You will have private access to the apartment, as well as access to the backyard to hang out in the Denver sun or grill ",
      propertyType: "APARTMENT",
      pricePerNight: 91.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/monet/Select-8071897/original/0daa30df-9b40-4d7f-a10e-7f5b394eb216", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "BBQ_GRILL", "WIFI", "FIREPLACE", "PARKING", "DRYER", "KITCHEN", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7523,
      longitude: -104.96948,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 655,
      hostId: hostMap["42637305"],
    },
  });
  // 40. Great location - close to downtown, RiNo
  await prisma.listing.upsert({
    where: { slug: "great-location-close-to-downtown-rino-24746875" },
    update: {},
    create: {
      slug: "great-location-close-to-downtown-rino-24746875",
      title: "Great location - close to downtown, RiNo",
      description: "No cleaning fee. Over 800 sq/ft of living space in the bottom unit of the duplex. Private entrance. Fantastic location close to Downtown Denver, RiNo District, Union Station, LoDo, Coors Field, City Park. Easy access from I-70.<br /><br />The unit is meticulously cleaned with fresh linens, mattress pads and bath towels before your stay. Super-fast internet, 65\u201d 4K HD TV with 80+ channels, HBO Max, Hulu and Netflix.",
      propertyType: "APARTMENT",
      pricePerNight: 131.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjQ3NDY4NzU%3D/original/dfcde95d-58d3-4fb4-beca-ce1695f32949.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Clayton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76634,
      longitude: -104.95386,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 634,
      hostId: hostMap["40976829"],
    },
  });
  // 41. Sonder Osage | Queen Studio Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-osage-queen-studio-apartment-41976040" },
    update: {},
    create: {
      slug: "sonder-osage-queen-studio-apartment-41976040",
      title: "Sonder Osage | Queen Studio Apartment",
      description: "Say hello to the Mile High City at Osage. A stunning abstract silhouette of the Rocky Mountains covers the building's facade. Inside, the elegantly designed spaces will equally impress you. Refresh and relax in your bright apartment with a fully equipped kitchen, in-suite laundry, and Roku streaming. With private parking included, you can easily step out. In vibrant LoHi, you'll stroll past Victorian buildings, quaint art galleries, and wine shops. Discover the best of Denver at Osage.",
      propertyType: "APARTMENT",
      pricePerNight: 177.0,
      cleaningFee: 27,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-41976040/original/c8750457-65b6-4db7-9d43-3c2cfa63a610.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76277,
      longitude: -105.00564,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.56,
      totalReviews: 681,
      hostId: hostMap["219524979"],
    },
  });
  // 42. Private Lock-off in RiNo (400+ Positive Reviews!)
  await prisma.listing.upsert({
    where: { slug: "private-lock-off-in-rino-400-positive-reviews-11521979" },
    update: {},
    create: {
      slug: "private-lock-off-in-rino-400-positive-reviews-11521979",
      title: "Private Lock-off in RiNo (400+ Positive Reviews!)",
      description: "Large, private studio with separate entrance, located in Denver's urban- industrial River North (RiNo) neighborhood.  Located walking distances from some of Denver's best restaurants, craft breweries, coffee shops, cocktail bars, and the world-class  RiNo Art District. This home-away-from-home is perfect for weekend guests looking to take advantage of all that Denver has to offer; and for weekday guests looking for a quiet retreat during work trips just outside of downtown Denver.",
      propertyType: "CABIN",
      pricePerNight: 133.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-11521979/original/b77f54d6-3bb7-41e8-962a-90df25634aed.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75688,
      longitude: -104.98418,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 629,
      hostId: hostMap["60744966"],
    },
  });
  // 43. The Highlands - Great Location!
  await prisma.listing.upsert({
    where: { slug: "the-highlands-great-location-11789571" },
    update: {},
    create: {
      slug: "the-highlands-great-location-11789571",
      title: "The Highlands - Great Location!",
      description: "Built in 1920, this mission style bungalow has been fully updated and transformed into a beautiful new space. Close to Highland's Square, Downtown Denver, shops, restaurants, cafe's and grocery stores. You\u2019ll love the location, the quaint neighborhood and the friendly neighbors. My place is good for couples, solo adventurers, business travelers and families (with kids)!",
      propertyType: "APARTMENT",
      pricePerNight: 105.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/7f10288d-e436-4861-96e1-fad69dff004f.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76346,
      longitude: -105.03519,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 632,
      hostId: hostMap["48525049"],
    },
  });
  // 44. Sparkling Carriage House near Downtown and Rino
  await prisma.listing.upsert({
    where: { slug: "sparkling-carriage-house-near-downtown-and-rino-18775585" },
    update: {},
    create: {
      slug: "sparkling-carriage-house-near-downtown-and-rino-18775585",
      title: "Sparkling Carriage House near Downtown and Rino",
      description: "Sun filled carriage house located in the historic Whittier neighborhood. Near the popular RiNo Art District which is known for its industrial street art, coffee shops, bars, restaurants, and breweries. Fun and safe area with tons to do.",
      propertyType: "CABIN",
      pricePerNight: 148.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/0518e580-3b5b-458a-b6d6-2f4df84aa15c.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75958,
      longitude: -104.9617,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 608,
      hostId: hostMap["25607097"],
    },
  });
  // 45. Private carriage house, kitchen, pets, backyard!
  await prisma.listing.upsert({
    where: { slug: "private-carriage-house-kitchen-pets-backyard-33557673" },
    update: {},
    create: {
      slug: "private-carriage-house-kitchen-pets-backyard-33557673",
      title: "Private carriage house, kitchen, pets, backyard!",
      description: "Chic, private carriage house w/full kitchen, fenced-in patio, quiet, and in the middle of it all.  Best of old and new <br /><br />- 4 blocks to City Park, Zoo, Museum of Nature/Science, golf course. <br />- 10min to downtown<br />- Pets allowed ($25 per pet/week per reservation) with dog door to patio.<br />- Chic brick, full kitchen - gas range, 3/4 bath, private patio. AC/Furnace.<br />- 420 friendly<br />- Helix luxe queen, + futon, +couch<br />- Walk to brewery, market, coffee, restaurant.<br />- extra guests +2 are $35/night",
      propertyType: "CABIN",
      pricePerNight: 138.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-33557673/original/074c9642-27b0-4633-9516-356a78a8bceb.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "BABY_GEAR", "WORKSPACE", "FIRST_AID_KIT", "SMOKE_ALARM", "TV"],
      address: "North Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75791,
      longitude: -104.93968,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 601,
      hostId: hostMap["106947890"],
    },
  });
  // 46. Walk to Top Restaurants From Platt Park Retreat
  await prisma.listing.upsert({
    where: { slug: "walk-to-top-restaurants-from-platt-park-retreat-19624348" },
    update: {},
    create: {
      slug: "walk-to-top-restaurants-from-platt-park-retreat-19624348",
      title: "Walk to Top Restaurants From Platt Park Retreat",
      description: "Cook gourmet meals in the well-stocked kitchen, complete with full-size fridge. The bright and airy interior features a tranquil color scheme and an open layout. This clean and modern guest space also comes with a roomy bathroom and hardwood floors.",
      propertyType: "CABIN",
      pricePerNight: 120.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/bb6a1418-a6f5-4f5d-af44-3741d9fb2de0.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68814,
      longitude: -104.9778,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 602,
      hostId: hostMap["11496272"],
    },
  });
  // 47. Mountain Views, Entertainment Galore!
  await prisma.listing.upsert({
    where: { slug: "mountain-views-entertainment-galore-14593779" },
    update: {},
    create: {
      slug: "mountain-views-entertainment-galore-14593779",
      title: "Mountain Views, Entertainment Galore!",
      description: "An enjoyable home for your next visit to Denver. Enjoy mountain views, watch a movie on the home theater, or kick back in a toasty hot tub surrounded by pine trees. Located near Tennyson Shopping District,Olde Towne Arvada, and Inspiration Point Park.Easy access to I-70  means just 25 minutes to the airport and 10 minutes to downtown Denver. Please note: we have two kids, and since we live upstairs you will hear some footsteps and other noise during the day, but night-time is calm and quiet.",
      propertyType: "CABIN",
      pricePerNight: 228.0,
      cleaningFee: 34,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/61c9dece-c487-42e7-b58f-276a48eb2cd9.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "HOT_TUB", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Regis, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.78883,
      longitude: -105.05298,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 608,
      hostId: hostMap["38865640"],
    },
  });
  // 48. Modern City View in Heart of LoHi 2016 BFN-0008531
  await prisma.listing.upsert({
    where: { slug: "modern-city-view-in-heart-of-lohi-2016-bfn-0008531-13751109" },
    update: {},
    create: {
      slug: "modern-city-view-in-heart-of-lohi-2016-bfn-0008531-13751109",
      title: "Modern City View in Heart of LoHi 2016 BFN-0008531",
      description: "Modern 1000 sq ft loft in heart of LoHi neighborhood with amazing city views.New Luxe Breeze  Temperpedic King Mattress .you\u2019ll love my place because of the great location...you have your own private parking ,50 inch flat screen tv and all new furniture in living room with fireplace..you can walk to all restaurants and sports venues..very convenient for all travelers..hip Lohi neighborhood..you'll say love it...<br />2016-BFN-0008531, City and County of Denver",
      propertyType: "APARTMENT",
      pricePerNight: 138.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/220be172-4cfd-4739-8d1f-ce8e71b3d921.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7606,
      longitude: -105.00893,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 599,
      hostId: hostMap["80564551"],
    },
  });
  // 49. Private Bed and Bath in New Townhome
  await prisma.listing.upsert({
    where: { slug: "private-bed-and-bath-in-new-townhome-14759489" },
    update: {},
    create: {
      slug: "private-bed-and-bath-in-new-townhome-14759489",
      title: "Private Bed and Bath in New Townhome",
      description: "***Please note: Solo guests only (1 person).***<br /><br />Modern 2400 sq. ft 4 story townhouse  in the heart of Denver's historic Five Points neighborhood. Located 10 blocks from trendy Rino arts district and 2 minute Uber or Lyft from downtown. Rino has some of the best new restaurants and breweries in Denver.<br /><br />For business travelers, there is a light rail stop 1 block away and goes right downtown. Runs every 15 minutes. A stop 2 blocks from Convention Center. $2.60 each way.",
      propertyType: "APARTMENT",
      pricePerNight: 86.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 1,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/d44a70a6-8d78-4666-966f-154e6b91acdf.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75369,
      longitude: -104.97549,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 598,
      hostId: hostMap["1093754"],
    },
  });
  // 50. Downtown/Ballpark/Walkable/Top 11 Airbnb in Denver
  await prisma.listing.upsert({
    where: { slug: "downtown-ballpark-walkable-top-11-airbnb-in-denver-11338921" },
    update: {},
    create: {
      slug: "downtown-ballpark-walkable-top-11-airbnb-in-denver-11338921",
      title: "Downtown/Ballpark/Walkable/Top 11 Airbnb in Denver",
      description: "This historic, 4-level, stylishly decorated 768 s/f, 1 bedroom/1 bath loft is located in the Lodo/Ballpark neighborhood. It's recognized by the Denver Business Journal as one of the top 11 Airbnb rentals in Denver. It offers all the comforts of home and is within walking distance to, Coors Field, Union Station, 16th Street Mall, plus numerous restaurants, bars and microbreweries are just blocks away.",
      propertyType: "APARTMENT",
      pricePerNight: 178.0,
      cleaningFee: 27,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/58a9046d-6d52-4770-a164-9fb3d928ec91.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75371,
      longitude: -104.98873,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.85,
      totalReviews: 593,
      hostId: hostMap["52363049"],
    },
  });
  // 51. Cozy Private Suite in Ruby Hill
  await prisma.listing.upsert({
    where: { slug: "cozy-private-suite-in-ruby-hill-34625442" },
    update: {},
    create: {
      slug: "cozy-private-suite-in-ruby-hill-34625442",
      title: "Cozy Private Suite in Ruby Hill",
      description: "All are welcome! Cozy, completely private, sun-filled room in Ruby Hill. Features a sitting area with flatscreen TV & streaming services, tiled shower with rain style shower head, & kitchenette with Keurig, microwave, dishes, & small fridge with filtered water dispenser. Hangers and hand steamer available in dresser. Private entrance and lockbox allow guests to come and go as they please. Parking available in driveway. 420 friendly outside the house (no smoking or vaping inside).",
      propertyType: "CABIN",
      pricePerNight: 76.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/c477487b-6a53-40e1-b683-5835cd17f408.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "KITCHEN", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Ruby Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.693,
      longitude: -105.01315,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 576,
      hostId: hostMap["58105586"],
    },
  });
  // 52. Sonder Bryant | One-Bedroom Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-bryant-one-bedroom-apartment-1105906700823585264" },
    update: {},
    create: {
      slug: "sonder-bryant-one-bedroom-apartment-1105906700823585264",
      title: "Sonder Bryant | One-Bedroom Apartment",
      description: "Welcome to Bryant \u2014 more than a stay, it's an experience. This property was newly built in 2023 and perfectly borders the Highland, Downtown, and Jefferson Park neighborhoods. You can work up a sweat in the fitness center and then cool down in the pool. Each apartment features floor-to-ceiling windows, in-suite laundry, and a Roku for streaming. You'll be a three-minute drive to Empower Field and Ball Arena. Whether you're here for a game or Mile High vibes, Bryant has you covered.",
      propertyType: "APARTMENT",
      pricePerNight: 153.0,
      cleaningFee: 23,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-1105906700823585264/original/b59e32b3-b8d6-4567-9c6b-20a4db8ec4fe.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["POOL", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "HOT_TUB", "DRYER", "PARKING", "KITCHEN", "WASHER", "SMOKE_ALARM", "GYM", "TV"],
      address: "Jefferson Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75371,
      longitude: -105.01979,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.74,
      totalReviews: 597,
      hostId: hostMap["219524979"],
    },
  });
  // 53. Spacious Basement Apartment in Historical Baker
  await prisma.listing.upsert({
    where: { slug: "spacious-basement-apartment-in-historical-baker-44554461" },
    update: {},
    create: {
      slug: "spacious-basement-apartment-in-historical-baker-44554461",
      title: "Spacious Basement Apartment in Historical Baker",
      description: "No check ins past 10:30pm. Spacious basement apartment with two bedrooms, private bath, living room and private entrance in the historic, artsy Baker neighborhood in Denver.<br />Lovely, safe, walkable neighborhood just 4 blocks from South Broadway, home to many popular bars, restaurants, vintage stores, bookstores, coffee shops, yoga studios, and markets.<br />5 min drive from I-25, 6th Ave, and Santa Fe, making day trips to the mountains convenient.  1.2 miles to light rail.  20 min drive to Red Rocks.",
      propertyType: "CABIN",
      pricePerNight: 90.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-44554461/original/2a00db1a-7f28-4b91-86ff-baeb0219c894.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Baker, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7226,
      longitude: -104.99471,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.82,
      totalReviews: 580,
      hostId: hostMap["19871094"],
    },
  });
  // 54. Chill at a Totally Private Carriage House W Bamboo Orb Chair
  await prisma.listing.upsert({
    where: { slug: "chill-at-a-totally-private-carriage-house-w-bamboo-orb-chair-29360234" },
    update: {},
    create: {
      slug: "chill-at-a-totally-private-carriage-house-w-bamboo-orb-chair-29360234",
      title: "Chill at a Totally Private Carriage House W Bamboo Orb Chair",
      description: "Completely private & professionally carriage home in historic South Pearl Street (https://www.southpearlstreet.com/)! Enjoy the Sunday Farmers Market. Take it easy in the hanging chair and check out the chalkboard map at this bohemian-inspired bolthole tucked away behind a 6-foot cedar privacy fence. Use your own front door to come and go as you please...you'll have complete privacy and never see the owners (unless you need them!) Quirky home details include a marching band bass drum table, an antique sewing machine treadle sink, and a 420 friendly patio with market lights. Doggos are welcome!<br /><br />Pearl Alley is a unique little carriage house in a truly fantastic neighborhood! Construction on the carriage house was completed in 2019, but we designed it to feel like part of the original house, built in 1908. Reclaimed brick exterior, moldings to match the main house, and the original back door as the bathroom door! Our 400 sq ft carriage house is filled with cool decor (see if yo",
      propertyType: "CABIN",
      pricePerNight: 147.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/6d916fad-40d9-4b97-8b8f-258caf7a017f.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "BABY_GEAR", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68675,
      longitude: -104.98097,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 558,
      hostId: hostMap["221190712"],
    },
  });
  // 55. Cozy Studio in BEST Neighborhood: Berkeley
  await prisma.listing.upsert({
    where: { slug: "cozy-studio-in-best-neighborhood-berkeley-4638352" },
    update: {},
    create: {
      slug: "cozy-studio-in-best-neighborhood-berkeley-4638352",
      title: "Cozy Studio in BEST Neighborhood: Berkeley",
      description: "Denver's best, safest, walkable neighborhood: The Highlands/Berkeley! Modern, cozy lower level guest suite just three blocks from extremely popular Tennyson St.  and across the street from Sprouts grocery store. Private bath, kitchenette, mini fridge, fireplace, and wifi. We are close to EVERYTHING: 20 minutes from Red Rocks, and under ten minutes from Downtown, Empower Field, and Ball Arena. <br />This is a studio below our house that has a common entrance into our house when you first come in.",
      propertyType: "CABIN",
      pricePerNight: 95.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/495262fd-c61a-43cf-84e5-d8d639261a81.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "TV", "PARKING", "DRYER", "FIRE_EXTINGUISHER", "KITCHEN", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76902,
      longitude: -105.04846,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 562,
      hostId: hostMap["11850286"],
    },
  });
  // 56. Updated Downtown Apartment in Baker with Off-Street Parking
  await prisma.listing.upsert({
    where: { slug: "updated-downtown-apartment-in-baker-with-off-street-parking-4545539" },
    update: {},
    create: {
      slug: "updated-downtown-apartment-in-baker-with-off-street-parking-4545539",
      title: "Updated Downtown Apartment in Baker with Off-Street Parking",
      description: "Spacious & Stylish Stay in Baker<br /><br />Welcome to your perfect getaway in the heart of Denver\u2019s vibrant Baker neighborhood! This 1,100 sq. ft. retreat blends modern comfort with all the conveniences of home. <br /><br />Nestled on a charming, tree-lined street, this walkable neighborhood offers both tranquility and easy access to the city\u2019s best spots. Just 2 blocks from Broadway, explore boutiques, bars, and top restaurants, or visit the nearby Santa Fe Arts District. <br /><br />Your ideal Denver home base awaits!",
      propertyType: "APARTMENT",
      pricePerNight: 110.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/a7b53ee3-5b39-41e6-a6a5-ff59e96960ac.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "WIFI", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Baker, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7177734375,
      longitude: -104.9898910522461,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.84,
      totalReviews: 566,
      hostId: hostMap["23466084"],
    },
  });
  // 57. Sonder Ceros | Two-Bedroom Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-ceros-two-bedroom-apartment-950001051197836881" },
    update: {},
    create: {
      slug: "sonder-ceros-two-bedroom-apartment-950001051197836881",
      title: "Sonder Ceros | Two-Bedroom Apartment",
      description: "Your Mile High adventure begins at Sonder Ceros. Stay in the heart of RiNo \u2014 Denver's most popular neighborhood for craft breweries, art, and culture. This newly constructed red brick building was built in 2023 with expansive windows and a modern interior. Each apartment includes everything you'll need for a comfortable stay. Fully equipped kitchens with ceramic backsplash and stainless steel appliances. In-suite laundry and wood-style flooring. And a Roku TV to stream your favorite movies.",
      propertyType: "APARTMENT",
      pricePerNight: 148.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-950001051197836881/original/390f11f6-0761-4b70-860c-46d678774dcc.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76501,
      longitude: -104.97463,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.64,
      totalReviews: 588,
      hostId: hostMap["219524979"],
    },
  });
  // 58. RiNo Come & Go - Private bed/bath ensuite
  await prisma.listing.upsert({
    where: { slug: "rino-come-go-private-bed-bath-ensuite-16857174" },
    update: {},
    create: {
      slug: "rino-come-go-private-bed-bath-ensuite-16857174",
      title: "RiNo Come & Go - Private bed/bath ensuite",
      description: "Middle of Mile High Modern Townhome. Walk to RiNo, Lodo & Downtown restaurants, breweries, museums, coffee/bagels, Coors Field , 16th Street, Union Station, Convention Center. NO SMOKING or PETS. Near Light Rail. Free street parking. Host is 22-year Denver resident who's visited 37 countries, 7 continents. Listing is his primary residence, and he's often there during stays. Shared entrance and living space does not compromise guests' security and privacy.   (License: 2017-BFN-0001779)",
      propertyType: "APARTMENT",
      pricePerNight: 69.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/78f00a12-850f-4e8e-8abc-8d163c32fb92.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7547,
      longitude: -104.98525,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 559,
      hostId: hostMap["112293494"],
    },
  });
  // 59. Expansive Remodeled Basement Apartment in Capitol Hill
  await prisma.listing.upsert({
    where: { slug: "expansive-remodeled-basement-apartment-in-capitol-hill-18331882" },
    update: {},
    create: {
      slug: "expansive-remodeled-basement-apartment-in-capitol-hill-18331882",
      title: "Expansive Remodeled Basement Apartment in Capitol Hill",
      description: "NO CLEANING FEE! <br /><br />Start your day in the big tiled shower; then catch up on emails at the handy work desk. This home reveals careful planning for two, showcased by a designer kitchenette, a washer/dryer, a smart TV with cable, a desk/workspace, and super fast Wifi. <br /><br />You'll have your own private entrance to this fully remodeled apartment. And we're close to everything: a Whole Foods brand grocery store right around the corner, restaurants, bars, and Cheesman Park are close. Free street parking.",
      propertyType: "CABIN",
      pricePerNight: 157.0,
      cleaningFee: 24,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-18331882/original/54e6f0ff-04bf-4ad4-86ec-cdc3b4361f3c.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "EV_CHARGER", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "WASHER", "PARKING", "DRYER", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73342,
      longitude: -104.97683,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 549,
      hostId: hostMap["9859688"],
    },
  });
  // 60. *Walk to EVERYTHING* in Trendy LoHi
  await prisma.listing.upsert({
    where: { slug: "walk-to-everything-in-trendy-lohi-10343072" },
    update: {},
    create: {
      slug: "walk-to-everything-in-trendy-lohi-10343072",
      title: "*Walk to EVERYTHING* in Trendy LoHi",
      description: "The Highlands is a bustling historic neighborhood in downtown Denver. Nooks and crannies of restaurants and coffee shops along side contemporary townhomes and Victorian era houses make it one of the top hoods in the country. <br /><br />You must read the House Rules before booking.",
      propertyType: "APARTMENT",
      pricePerNight: 131.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/5d4209df-bba9-4408-b4c9-4eafa44eb2aa.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76798,
      longitude: -105.0111,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 550,
      hostId: hostMap["47859549"],
    },
  });
  // 61. "Blue Ox" Charming 2 Bedroom Triplex - S Broadway
  await prisma.listing.upsert({
    where: { slug: "blue-ox-charming-2-bedroom-triplex-s-broadway-20624536" },
    update: {},
    create: {
      slug: "blue-ox-charming-2-bedroom-triplex-s-broadway-20624536",
      title: "\"Blue Ox\" Charming 2 Bedroom Triplex - S Broadway",
      description: "Located in the heart of trendy South Broadway, literally steps away from Denver's favorite bars, restaurants, boutiques, thrift stores, music venues, & rooftop patios . Blue Ox is a 5 minute uber or lyft from downtown and a short walk to the Light Rail. Daily scooter and bicycle rentals located just around the corner. Walking distance to wash park, grocery and liquor stores, movie theaters and pharmacies. 1 -2 hours from Summit County ski resorts. Parking available upon request.<br /><br />*No Parties*",
      propertyType: "CABIN",
      pricePerNight: 144.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/7c92478b-49a6-4357-a542-7c92dd454679.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71571,
      longitude: -104.98651,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 545,
      hostId: hostMap["61177011"],
    },
  });
  // 62. Upgraded King Bed Private Apt in Congress Park
  await prisma.listing.upsert({
    where: { slug: "upgraded-king-bed-private-apt-in-congress-park-22056178" },
    update: {},
    create: {
      slug: "upgraded-king-bed-private-apt-in-congress-park-22056178",
      title: "Upgraded King Bed Private Apt in Congress Park",
      description: "Awesome newly remodeled basement apartment with king bed and rain shower in Congress Park. Walking distance to dozens of restaurants & bars, Sprouts grocery store, Bluebird Theater, City Park, and the Denver Zoo/Science Museum! Walkscore of 84 and ample bike and scooter rental kiosks nearby.  A parking space is included if needed, and a 10 min Uber/Lyft to Downtown/RiNo/LoDo.  Enjoy this gem in a walkable, friendly part of Denver close to amazing restaurants, museums, and parks!",
      propertyType: "CABIN",
      pricePerNight: 136.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/499a777d-e4b9-43f1-a6d8-262e27a02339.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "SMOKE_ALARM", "TV"],
      address: "City Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74019,
      longitude: -104.94588,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 549,
      hostId: hostMap["64249345"],
    },
  });
  // 63. Gipsy Cottage: Private Suite with Balcony
  await prisma.listing.upsert({
    where: { slug: "gipsy-cottage-private-suite-with-balcony-24161341" },
    update: {},
    create: {
      slug: "gipsy-cottage-private-suite-with-balcony-24161341",
      title: "Gipsy Cottage: Private Suite with Balcony",
      description: "Stay in a private, second floor suite in a renovated Victorian home located in Platt Park, Denver's trendiest neighborhood. Enjoy a spacious bedroom with balcony, living room, and full bath. We don't charge any cleaning fees.<br /><br />Centrally located and easy access all around Denver. Just a few minutes walk to public transit, lively Old South Pearl Street district's shops and restaurants, and all that eclectic South Broadway (SOBO) offers!",
      propertyType: "APARTMENT",
      pricePerNight: 98.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/4fe993fb-defe-4001-bdb7-8ecae992f791.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68576,
      longitude: -104.98228,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 540,
      hostId: hostMap["5449792"],
    },
  });
  // 64. Carriage House on the alley
  await prisma.listing.upsert({
    where: { slug: "carriage-house-on-the-alley-35683144" },
    update: {},
    create: {
      slug: "carriage-house-on-the-alley-35683144",
      title: "Carriage House on the alley",
      description: "Carriage house on the alley.  Denver Short Term Rental License No.:  2019-BFN-005180.  Quiet neighborhood close to downtown, the sports venues and Meow Wolf.  Walk to Sloan's Lake, Edgewater, Berkley and Highlands.  <br /><br />Sleeps up to 6.  Queen size adjustable bed in bedroom, Queen and Full size Lazy-boy sofa sleepers.  Base rate is double occupancy, small charge ($10) for each additional guest.<br /><br />Off street parking for two cars right at the door.",
      propertyType: "CABIN",
      pricePerNight: 105.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/b31f7ea6-0b4b-476e-875d-b529e3ab603f.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76041,
      longitude: -105.04336,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 541,
      hostId: hostMap["268426834"],
    },
  });
  // 65. Cozy N. Park Hill private Garden level apartment.
  await prisma.listing.upsert({
    where: { slug: "cozy-n-park-hill-private-garden-level-apartment-13204273" },
    update: {},
    create: {
      slug: "cozy-n-park-hill-private-garden-level-apartment-13204273",
      title: "Cozy N. Park Hill private Garden level apartment.",
      description: "Come enjoy this cozy private Garden level basement apartment! You with have a private 790sqft apartment to  yourself! Parking is available on the property and lit at night. Not only is this home part of the lovely North Park Hill neighborhood, but it's conveniently situated on the RTD bus line which will take you directly downtown to enjoy the shopping, restaurants and nightlife that Denver has to offer. Rest comfortably here. Grocery store and restaurants walking distance from the house.",
      propertyType: "APARTMENT",
      pricePerNight: 65.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-13204273/original/6c52680a-40b0-4b8c-b0ca-6c4972e75cb4.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "WASHER", "SMOKE_ALARM", "TV"],
      address: "South Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75032,
      longitude: -104.90441,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 543,
      hostId: hostMap["47682244"],
    },
  });
  // 66. Private Cap Hill Guest House - Amazing Location!
  await prisma.listing.upsert({
    where: { slug: "private-cap-hill-guest-house-amazing-location-37206363" },
    update: {},
    create: {
      slug: "private-cap-hill-guest-house-amazing-location-37206363",
      title: "Private Cap Hill Guest House - Amazing Location!",
      description: "Welcome to the Queen City Cooperative! Enjoy your stay in our renovated guest suite. Close to tons of restaurants, coffee shops, bars and independent shops. A perfect place to explore the city and to cozy up at the end of the day!<br /><br />Your stay at our co-op supports permanently affordable housing in Denver.<br />Ask us to learn more!",
      propertyType: "CABIN",
      pricePerNight: 103.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 1,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-37206363/original/32693b66-27eb-4779-8cf8-c9a1bb2c26f7.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73014,
      longitude: -104.97673,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 551,
      hostId: hostMap["280045010"],
    },
  });
  // 67. Curtis Park Alley Flat
  await prisma.listing.upsert({
    where: { slug: "curtis-park-alley-flat-23308643" },
    update: {},
    create: {
      slug: "curtis-park-alley-flat-23308643",
      title: "Curtis Park Alley Flat",
      description: "We've been voted 1 of the top 5 Airbnbs in Colorado! <br />Enjoy our modern apartment in Historic Curtis Park. <br />Love art, theater, live music, great restaurants, craft breweries, distilleries and wineries? Enjoy exploring the city without a car?  Our 2nd floor studio in historic Curtis Park is perfect. Walk to Coors Field, RiNo Art District, museums, theaters,  and dining. <br />Light Rail is one block, train to DIA is one mile,  bike and scooter-share are widely available too.",
      propertyType: "CABIN",
      pricePerNight: 154.0,
      cleaningFee: 23,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/a9c75a28-f8eb-470d-8a43-908a5681a4e2.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75369,
      longitude: -104.97973,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 531,
      hostId: hostMap["34516070"],
    },
  });
  // 68. Live like a local in our clean private apartment
  await prisma.listing.upsert({
    where: { slug: "live-like-a-local-in-our-clean-private-apartment-12654017" },
    update: {},
    create: {
      slug: "live-like-a-local-in-our-clean-private-apartment-12654017",
      title: "Live like a local in our clean private apartment",
      description: "This clean apartment (Permit 2017-BFN-(PHONE NUMBER HIDDEN)) is located on the 2nd and 3rd floors of our home.  It is only used for Airbnb. It has a separate entrance and its own deck in the heart of the city.  You will be 5 min from Downtown and Cherry Creek and 15 min to the Tech Center.  Super close to the Convention Center, Pepsi Center, Coors Field, Cherry Creek and everything downtown. There is also free street parking.",
      propertyType: "APARTMENT",
      pricePerNight: 110.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-12654017/original/27c8116d-62ae-4bb2-bc80-7d038752edb5.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71818,
      longitude: -104.98493,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 538,
      hostId: hostMap["3256573"],
    },
  });
  // 69. 900 sq/ft - 2br/1ba in Santa Fe Art District
  await prisma.listing.upsert({
    where: { slug: "900-sq-ft-2br-1ba-in-santa-fe-art-district-32812933" },
    update: {},
    create: {
      slug: "900-sq-ft-2br-1ba-in-santa-fe-art-district-32812933",
      title: "900 sq/ft - 2br/1ba in Santa Fe Art District",
      description: "** Completely renovated, making the guest experience even better! ** <br /><br />Welcome to Denver! We love hosting travelers in the 900 sq/ft basement unit of our home!<br /><br />Our duplex consists of an upstairs unit and a downstairs unit. Your unit has a locked door and does not have any shared spaces. There is a shared entryway with a laundry room (that you are welcome to use!)<br /><br />There is street parking available in front and on surrounding blocks.",
      propertyType: "APARTMENT",
      pricePerNight: 56.0,
      cleaningFee: 8,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-32812933/original/6ef702d1-8ebc-4bfe-9362-db2c10de7bca.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Lincoln Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.72883,
      longitude: -105.00174,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 538,
      hostId: hostMap["5338178"],
    },
  });
  // 70. Cozy Neighborhood Spot Close to Downtown
  await prisma.listing.upsert({
    where: { slug: "cozy-neighborhood-spot-close-to-downtown-16742127" },
    update: {},
    create: {
      slug: "cozy-neighborhood-spot-close-to-downtown-16742127",
      title: "Cozy Neighborhood Spot Close to Downtown",
      description: "Escape to your charming forest cabin themed apartment with a private entrance, high vaulted ceilings, and natural light. Unwind with a cozy memory foam mattress and a luxurious soaking tub. Have fun with Apple TV, games, and coloring books, and cook up a storm with a glass cooktop, microwave, and toaster oven. Perfectly situated near local dining and culture, stroll through the beautiful Sunnyside neighborhood to yoga studios, coffee shops, and boutiques. Convenient street parking is available.",
      propertyType: "CABIN",
      pricePerNight: 109.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/monet/Select-16742127/original/ca0a6aae-8d59-4d69-997e-f23c24f9f220", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77802,
      longitude: -105.02035,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 524,
      hostId: hostMap["17081686"],
    },
  });
  // 71. Kasa | 2BD, Explore Confluence Park | Denver
  await prisma.listing.upsert({
    where: { slug: "kasa-2bd-explore-confluence-park-denver-44334738" },
    update: {},
    create: {
      slug: "kasa-2bd-explore-confluence-park-denver-44334738",
      title: "Kasa | 2BD, Explore Confluence Park | Denver",
      description: "Located in the stylish LoDo neighborhood, Kasa Union Station is just steps away from a number of exciting local attractions - including Millennium Bridge, bars, restaurants, and parks with excellent views of the surrounding mountain tops. Nearby attractions include; Coors Field, where you can catch a Rockies game in the summer, and Empower Field, home to the Denver Broncos. Watch a game or grab a beer at a local brewery with Kasa as your home base!",
      propertyType: "APARTMENT",
      pricePerNight: 999.0,
      cleaningFee: 150,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-44334738/original/ccf8bfc8-03cd-45e9-a4d5-ead1dcc41f01.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["EV_CHARGER", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PET_FRIENDLY", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "PARKING", "WORKSPACE", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "GYM", "CARBON_MONOXIDE_ALARM"],
      address: "Union Station, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75784,
      longitude: -105.00466,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.74,
      totalReviews: 543,
      hostId: hostMap["88566861"],
    },
  });
  // 72. Charming Newly Built Carriage House
  await prisma.listing.upsert({
    where: { slug: "charming-newly-built-carriage-house-10266757" },
    update: {},
    create: {
      slug: "charming-newly-built-carriage-house-10266757",
      title: "Charming Newly Built Carriage House",
      description: "This charming carriage house was built in 2014 and is located in the historic San Rafael neighborhood.   You will be blocks from the light rail, adjacent to the hot Five Points and RINO neighborhoods, and a short Uber ride from downtown.",
      propertyType: "CABIN",
      pricePerNight: 106.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/6f144c6c-dc3d-489c-8899-773d9be67a3f.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75363,
      longitude: -104.9748,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 521,
      hostId: hostMap["52788342"],
    },
  });
  // 73. Private Guest Suite in SW Denver (no cleaning fee)
  await prisma.listing.upsert({
    where: { slug: "private-guest-suite-in-sw-denver-no-cleaning-fee-683467192294834345" },
    update: {},
    create: {
      slug: "private-guest-suite-in-sw-denver-no-cleaning-fee-683467192294834345",
      title: "Private Guest Suite in SW Denver (no cleaning fee)",
      description: "Enjoy a stylish experience at this newly renovated guest suite attached to a Harvey Park Home. Located between the mountains and downtown Denver, Harvey Park is a vibrant, multi-cultural city neighborhood.<br /><br />The unit boasts a spa-like rainfall shower, ideal for relaxing after a day exploring the mountains or the city. A private entrance to a private, off-street backyard keeps the unit quiet and secluded from the street noise. <br /><br />420 friendly backyard, no smoking in the unit.",
      propertyType: "CABIN",
      pricePerNight: 105.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-683467192294834345/original/06390622-95ef-4483-912c-a60e042d9643.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Harvey Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.67471,
      longitude: -105.03129,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 517,
      hostId: hostMap["268095022"],
    },
  });
  // 74. Vacation on Vine (Garage Space Included!)
  await prisma.listing.upsert({
    where: { slug: "vacation-on-vine-garage-space-included-31336941" },
    update: {},
    create: {
      slug: "vacation-on-vine-garage-space-included-31336941",
      title: "Vacation on Vine (Garage Space Included!)",
      description: "Pack light and travel with ease. Vacation on Vine meets all major needs-  private modern detached carriage house above the garage including a work space, high speed internet, lush bedding, full-kitchen, surround sound entertainment center, garage parking space and your own separate entrance.",
      propertyType: "APARTMENT",
      pricePerNight: 140.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/25de1abe-81a6-4ce0-8078-6a4648aa921a.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76026,
      longitude: -104.96263,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 509,
      hostId: hostMap["22620764"],
    },
  });
  // 75. Denver LoHi Local Clean & Modern Walkable
  await prisma.listing.upsert({
    where: { slug: "denver-lohi-local-clean-modern-walkable-8556263" },
    update: {},
    create: {
      slug: "denver-lohi-local-clean-modern-walkable-8556263",
      title: "Denver LoHi Local Clean & Modern Walkable",
      description: "Large modern clean townhouse xtra large roof deck featuring down town views. Two car garage and back yard with patio in central LOHI within 2-3 blocks from great restaurants, bars, breweries, 5 mins drive or 15 mins walk to downtown (Lodo), 20 mins drive to Red Rocks amphitheater, 5 mins drive to Broncos stadium, 6 mins to Coors Field, 7 mins to Ball Arena, 10 mins to Colorado Convention Cntr, 1 hour to Loveland ski area 1.5 hours drive to Breckenridge, Winter Park and Copper Mountain ski areas.",
      propertyType: "APARTMENT",
      pricePerNight: 463.0,
      cleaningFee: 69,
      serviceFee: 0,
      maxGuests: 11,
      bedrooms: 5,
      bathrooms: 4,
      beds: 7,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6ODU1NjI2Mw%3D%3D/original/7ead22ed-1c99-443c-b786-bfe306a0aa77.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "WASHER", "FIREPLACE", "PARKING", "DRYER", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "BBQ_GRILL", "AIR_CONDITIONING", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76272,
      longitude: -105.00863,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 511,
      hostId: hostMap["45038909"],
    },
  });
  // 76. Adorable Victorian - Denver Highlands
  await prisma.listing.upsert({
    where: { slug: "adorable-victorian-denver-highlands-20163628" },
    update: {},
    create: {
      slug: "adorable-victorian-denver-highlands-20163628",
      title: "Adorable Victorian - Denver Highlands",
      description: "This home is a gorgeous Denver square built in 1890 with 3BRs that was tastefully renovated to maintain the home's original charm. One block to the 32nd and Lowell historic neighborhood with cute shops, cafes, and restaurants; it's a super hip neighborhood that is quiet and very fun. The home is spacious and comfortable with mid-century modern decor, granite countertops, hardwood floors, and a fully stocked kitchen that will satisfy the most discerning chef.",
      propertyType: "APARTMENT",
      pricePerNight: 234.0,
      cleaningFee: 35,
      serviceFee: 0,
      maxGuests: 7,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-20163628/original/1dbc59fa-9bf5-44e6-a3ed-f408bba76b0e.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "WASHER", "FIREPLACE", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76321,
      longitude: -105.03722,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 511,
      hostId: hostMap["24517598"],
    },
  });
  // 77. PrivateEntry/Driveway Unit -1NightStay-SBroadwayDU
  await prisma.listing.upsert({
    where: { slug: "privateentry-driveway-unit-1nightstay-sbroadwaydu-37684648" },
    update: {},
    create: {
      slug: "privateentry-driveway-unit-1nightstay-sbroadwaydu-37684648",
      title: "PrivateEntry/Driveway Unit -1NightStay-SBroadwayDU",
      description: "Located very close to Harvard Gulch/DU/South Broadway.  Guest can enjoy the convenience of parking in the driveway connected to the private entrance with patio outside the door.  Enter into a large 15x15 private room with on-suite bathroom.  You have a queen bed.  Sitting area to do work with a mini refrigerator stocked with refreshments, coffee maker and iron.  Great location close to everything!",
      propertyType: "CABIN",
      pricePerNight: 69.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-37684648/original/8b1bae8a-73a3-40e6-83af-439c9ca9e21d.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Rosedale, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.66810257271933,
      longitude: -104.9796105715614,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.84,
      totalReviews: 516,
      hostId: hostMap["284805380"],
    },
  });
  // 78. Private Entry Suite in Cole/RiNo Near Downtown
  await prisma.listing.upsert({
    where: { slug: "private-entry-suite-in-cole-rino-near-downtown-25476793" },
    update: {},
    create: {
      slug: "private-entry-suite-in-cole-rino-near-downtown-25476793",
      title: "Private Entry Suite in Cole/RiNo Near Downtown",
      description: "Contemporary and comfortable, this historic house is a picturesque discovery in the heart of the Cole neighborhood tucked into the hip area of RiNo (RiverNorth). Behind the Victorian architecture, this unique 1880s home is tastefully upgraded with modern amenities and vintage finishes. You\u2019ll love this place because of your private outdoor space, the neighborhood, and the proximity to the trendy RiNo scene. Overall, this suite is ideal for couples, solo adventurers, and business travelers alike.",
      propertyType: "CABIN",
      pricePerNight: 107.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-25476793/original/925852b0-e1eb-494f-b681-511a3ab865d8.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76362,
      longitude: -104.96994,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 5.0,
      totalReviews: 494,
      hostId: hostMap["19196235"],
    },
  });
  // 79. cozy private room with patio, 1 mile from downtown
  await prisma.listing.upsert({
    where: { slug: "cozy-private-room-with-patio-1-mile-from-downtown-36104111" },
    update: {},
    create: {
      slug: "cozy-private-room-with-patio-1-mile-from-downtown-36104111",
      title: "cozy private room with patio, 1 mile from downtown",
      description: "Cozy keyless private bed & bathroom with patio close to downtown and Denver\u2019s premier city events and venues -around a mile or less to civic center, convention center, downtown.  2 blocks from the Fillmore and Ogden theatre.  Around a 2 mile trip for Coors Field & Pepsi Center, 3 for Mile High Stadium. A great central place close to all the cool and desirable urban destinations and fine dining, shopping, and recreation that Denver has to offer via a short ride share, walk, or bike/scooter ride.",
      propertyType: "APARTMENT",
      pricePerNight: 94.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/80648d84-9120-4faf-a6a8-ca5c456149db.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73624,
      longitude: -104.97695,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 497,
      hostId: hostMap["240217727"],
    },
  });
  // 80. Private Guesthouse in the Highlands/ Lohi
  await prisma.listing.upsert({
    where: { slug: "private-guesthouse-in-the-highlands-lohi-9009513" },
    update: {},
    create: {
      slug: "private-guesthouse-in-the-highlands-lohi-9009513",
      title: "Private Guesthouse in the Highlands/ Lohi",
      description: "Cute, Cozy and Comfy one bedroom apartment in LoHi, Denver's most exciting neighborhood. Central location with quality and eclectic dining and entertainment options all within easy walking distance, close to Union Station and the new Train to the Plane, and easy access to I-25 and I-70. This one bedroom apartment has a full kitchen, one bedroom, bathroom and  living room with cable tv, and a bluetooth speaker. Super comfy queen bed in beautiful, clean and newly built apartment above our garage.",
      propertyType: "CABIN",
      pricePerNight: 98.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/e711c068-2912-4a21-9c11-ca42cf587500.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76577,
      longitude: -105.01718,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 5.0,
      totalReviews: 492,
      hostId: hostMap["47046454"],
    },
  });
  // 81. The Larimer Life - Rooftop in RiNo -
  await prisma.listing.upsert({
    where: { slug: "the-larimer-life-rooftop-in-rino-22529249" },
    update: {},
    create: {
      slug: "the-larimer-life-rooftop-in-rino-22529249",
      title: "The Larimer Life - Rooftop in RiNo -",
      description: "Come stay in RiNo, Denver's hottest neighborhood. Walk 2 blocks to Larimer for restaurants, galleries, breweries, yoga studios, dispensaries, etc. Watch the lively neighborhood from our rooftop deck! Beautiful open floor plan, large windows, quartz countertops make this home great for entertaining. Expansive rooftop deck for sunrise or sunset viewing. Quick access to downtown, the arenas / stadiums.",
      propertyType: "APARTMENT",
      pricePerNight: 476.0,
      cleaningFee: 71,
      serviceFee: 0,
      maxGuests: 10,
      bedrooms: 4,
      bathrooms: 4,
      beds: 7,
      images: ["https://a0.muscache.com/pictures/c1897b55-1738-41b0-ac22-87ec31bec381.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75494,
      longitude: -104.98346,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 505,
      hostId: hostMap["26476553"],
    },
  });
  // 82. Solar Powered Steele Trap
  await prisma.listing.upsert({
    where: { slug: "solar-powered-steele-trap-37015519" },
    update: {},
    create: {
      slug: "solar-powered-steele-trap-37015519",
      title: "Solar Powered Steele Trap",
      description: "One mile to City Park, science museum, zoo and bike and boat rentals.  Easy access to I-70, I-25 and a light rail stop; go to and from the airport, the mountains, Red Rocks and Coors Field.  Or stay in Clayton and walk to our local coffee shops, bbq, brewery, cajun restaurant or authentic taco shop.",
      propertyType: "CABIN",
      pricePerNight: 111.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-37015519/original/4fdf8480-187f-480e-9c8d-ed524f155193.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Clayton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76569,
      longitude: -104.95141,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 500,
      hostId: hostMap["121135906"],
    },
  });
  // 83. Lovely West Wash Park Guest House
  await prisma.listing.upsert({
    where: { slug: "lovely-west-wash-park-guest-house-5966633" },
    update: {},
    create: {
      slug: "lovely-west-wash-park-guest-house-5966633",
      title: "Lovely West Wash Park Guest House",
      description: "This impeccably remodeled 1930's charmer is located in one of Denver's most coveted neighborhoods, Wash Park West.  Awesome location, $5 Uber to Downtown, the Convention Center, Cherry Creek - Walking distance to Wash Park (Denver's most popular park) and the Cherry Creek bike trail. Walking distance to some of Denver's best restaurants and coffee shops.  Thoughtful touches, modern, yet timeless, decor, high ceilings, light & bright. Includes Central Air Conditioning, full kitchen, washer/dryer!",
      propertyType: "CABIN",
      pricePerNight: 122.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-5966633/original/2c63f0f5-a9ce-44bb-9663-07d896c2baaf.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71396,
      longitude: -104.97608,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 488,
      hostId: hostMap["30972487"],
    },
  });
  // 84. Sentral Designer Furnished Studio at Union Station
  await prisma.listing.upsert({
    where: { slug: "sentral-designer-furnished-studio-at-union-station-52411229" },
    update: {},
    create: {
      slug: "sentral-designer-furnished-studio-at-union-station-52411229",
      title: "Sentral Designer Furnished Studio at Union Station",
      description: "Rooftop Deck w/ Resort-Style Pool \u2022 Expansive Outdoor Lounge w/ Firepits & Grilling Stations \u2022 On-Site Dining \u2022 Fitness Center \u2022 Movie Theater \u2022 Demonstration Kitchen \u2022 Pet Friendly w/ Amenities \u2022 Co-Working Space w/ High-Speed WiFi \u2022 Walk to Union Station, LoDo\u2019s Dining & Nightlife, Coors Field & South Platte River<br /><br />Sentral Union Station blends upscale comfort with the vibrant energy of downtown Denver.",
      propertyType: "APARTMENT",
      pricePerNight: 232.0,
      cleaningFee: 35,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-52411229/original/b36d005c-141f-47d1-ba78-866ebdc74409.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "EV_CHARGER", "WORKSPACE", "WIFI", "HOT_TUB", "WASHER", "GYM", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "TV", "CARBON_MONOXIDE_ALARM", "POOL", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "SMOKE_ALARM"],
      address: "Union Station, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7549,
      longitude: -105.00097,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.64,
      totalReviews: 516,
      hostId: hostMap["261774896"],
    },
  });
  // 85. SPA House ~ 420, massages, sauna, fun! <3
  await prisma.listing.upsert({
    where: { slug: "spa-house-420-massages-sauna-fun-3-8718728" },
    update: {},
    create: {
      slug: "spa-house-420-massages-sauna-fun-3-8718728",
      title: "SPA House ~ 420, massages, sauna, fun! <3",
      description: "Come share our peaceful space in the bustling city of Denver. Located right off I 70 near the airport (about 20 minutes). Great local dinning, drinking, and entertainment.  Comfortable  queen bed and work desk. Close to the mountains.  420 Friendly.",
      propertyType: "APARTMENT",
      pricePerNight: 55.0,
      cleaningFee: 8,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/c551a05c-21c2-473c-bb2f-0f8f72e7cab1.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "BBQ_GRILL", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Northeast Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7637,
      longitude: -104.93342,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.81,
      totalReviews: 496,
      hostId: hostMap["11124324"],
    },
  });
  // 86. Private, charming, quiet cottage. PRIME Location!
  await prisma.listing.upsert({
    where: { slug: "private-charming-quiet-cottage-prime-location-27722990" },
    update: {},
    create: {
      slug: "private-charming-quiet-cottage-prime-location-27722990",
      title: "Private, charming, quiet cottage. PRIME Location!",
      description: "FUN, stylish, inviting, sunny, comfortable & TOTALLY PRIVATE guest home with pillow top beds, blackout curtains, adorable stocked kitchenette w/plug- in stove top cookers, microwave/full size fridge/dishwasher! Gorgeous and spacious patio w/BBQ & ping pong table. Incredible location - easy access to all the fun plus 1 block away from 1 of Denver's biggest and best parks w/2 lakes, the Zoo & Museum of Nature and Science. Smart TV with Hulu/Live TV/Disney/ESPN. <br />** GREAT REVIEWS FROM PRIOR GUESTS!",
      propertyType: "CABIN",
      pricePerNight: 176.0,
      cleaningFee: 26,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Mjc3MjI5OTA=/original/d56602d9-7a9d-469e-974a-7e7dda61b111.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "WASHER", "PARKING", "DRYER", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "South Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74407599107277,
      longitude: -104.93926465511322,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 478,
      hostId: hostMap["209297769"],
    },
  });
  // 87. Denver Urban Tree House
  await prisma.listing.upsert({
    where: { slug: "denver-urban-tree-house-22978126" },
    update: {},
    create: {
      slug: "denver-urban-tree-house-22978126",
      title: "Denver Urban Tree House",
      description: "Welcome to the our clean and bright studio apartment that offers a fenced backyard for your pup! Located in a walkable neighborhood with dining, breweries, shops and parks. See downtown from your second story deck! We are close to downtown, RiNo, in Five Points and also near LoDo. <br /><br />This space is private and not attached to our home. It has a kitchenette with refrigerator, microwave, hot plate, sink, coffee maker and toaster, all dishes and silverware. There is a large walk in closet.",
      propertyType: "CABIN",
      pricePerNight: 99.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/a431838b-4ac5-4cb9-b183-922e1b14dc3a.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75818,
      longitude: -104.97581,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 477,
      hostId: hostMap["1895593"],
    },
  });
  // 88. Denver Victorian Mansion Apartment
  await prisma.listing.upsert({
    where: { slug: "denver-victorian-mansion-apartment-11945010" },
    update: {},
    create: {
      slug: "denver-victorian-mansion-apartment-11945010",
      title: "Denver Victorian Mansion Apartment",
      description: "Enjoy this gorgeous freshly-renovated apartment in the back of my historic 1896 Victorian Capitol Hill Mansion. Cozy, comfortable, and in the heart of the city- just blocks to some of the city's best restaurants, concert venues, coffee shops, and parks!  We just completed a full remodel of the entire apartment, and everything from the furniture to the appliances and everything in-between is brand new!",
      propertyType: "APARTMENT",
      pricePerNight: 138.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/20d8ef23-e629-475d-94da-f791a59b95c7.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73459,
      longitude: -104.97415,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 478,
      hostId: hostMap["63778241"],
    },
  });
  // 89. Lohi Oasis Sleeps 4 Bkfst included @ Fox & the Hen
  await prisma.listing.upsert({
    where: { slug: "lohi-oasis-sleeps-4-bkfst-included-fox-the-hen-34813376" },
    update: {},
    create: {
      slug: "lohi-oasis-sleeps-4-bkfst-included-fox-the-hen-34813376",
      title: "Lohi Oasis Sleeps 4 Bkfst included @ Fox & the Hen",
      description: "Booking offers $25 off your bill at Lohi\u2019s hottest breakfast spot, Fox & the Hen. <br />Right in the Heart of the hottest neighborhood in Denver. This completely locked off Mother-in-Law Suite is walking distance to bars, restaurants, parks, ice cream, and downtown Denver.  You can even walk to all 3 major stadiums.  Huge SHARED back yard, access to outdoor kitchen, patio seating and lawn lounging area.",
      propertyType: "CABIN",
      pricePerNight: 115.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-34813376/original/a6576aa8-7337-4331-bb67-9f3ad4061367.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.760986328125,
      longitude: -105.01342010498047,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 478,
      hostId: hostMap["52470095"],
    },
  });
  // 90. Downtown Views From Fashionable North Lohi Home
  await prisma.listing.upsert({
    where: { slug: "downtown-views-from-fashionable-north-lohi-home-20211505" },
    update: {},
    create: {
      slug: "downtown-views-from-fashionable-north-lohi-home-20211505",
      title: "Downtown Views From Fashionable North Lohi Home",
      description: "Your PERFECT home away from home. Comfortably furnished with great amenities, location, indoor/outdoor spaces to enjoy with family and friends.  LED lights in any room to suit the mood, with plenty of natural light also to be had in this south-facing home. Spread out on the rattan sectional sofa on the rooftop deck, while interior pluses include big flat screen TVs in all rooms, high speed wifi connect ability and centralized location to best explore downtown and theColorado Rocky Mountains!",
      propertyType: "APARTMENT",
      pricePerNight: 230.0,
      cleaningFee: 34,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjAyMTE1MDU%3D/original/1ef5123f-8ece-4512-a712-5920311dea15.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77662,
      longitude: -105.01914,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 482,
      hostId: hostMap["21899708"],
    },
  });
  // 91. Charming Guest Suite In East Denver 3 Comfy Beds
  await prisma.listing.upsert({
    where: { slug: "charming-guest-suite-in-east-denver-3-comfy-beds-7091323" },
    update: {},
    create: {
      slug: "charming-guest-suite-in-east-denver-3-comfy-beds-7091323",
      title: "Charming Guest Suite In East Denver 3 Comfy Beds",
      description: "Welcome to my home in Southeast Denver!<br /> <br />Experience our bustling metropolis while only paying prairie prices!<br /><br />Many types of travelers have loved this space.  First time AirBnB users, business travelers, backpackers, cannabis consumers, couples, road-trippers, world travelers, conventioneers, elderly people, college kids, etc.<br /><br />Property is tolerant of all guests. All races/genders/sexual orientations/preferred pronouns etc<br /><br />.",
      propertyType: "CABIN",
      pricePerNight: 83.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/301c0c21-bbce-4176-82b3-2c582057b77b.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Washington Virginia Vale, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.70989,
      longitude: -104.91529,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.76,
      totalReviews: 493,
      hostId: hostMap["33601029"],
    },
  });
  // 92. Suite Tennyson at Sloan's Lake
  await prisma.listing.upsert({
    where: { slug: "suite-tennyson-at-sloan-s-lake-20652963" },
    update: {},
    create: {
      slug: "suite-tennyson-at-sloan-s-lake-20652963",
      title: "Suite Tennyson at Sloan's Lake",
      description: "Private, spacious, modern, can't beat the location! 1/2 block to Sloan's Lake Park, 2 blocks to \"SloHi\" (brewery, coffee shop , bagels, sports bar), 10-15 minute walk to Edgewater, Highlands Square, or Berkely / Tennyson St Cultural District. 7 min drive to downtown.<br /><br />Quiet & safe neighborhood. We are a family with young children, you will hear us upstairs during our morning & evening routines.<br /><br />Guests are welcomed to use back yard patio & amenities. Smoking is permitted outside including 420.",
      propertyType: "CABIN",
      pricePerNight: 84.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-20652963/original/123e24b5-8e74-4d07-b308-2fee745ab153.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sloan Lake, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75547,
      longitude: -105.04476,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 470,
      hostId: hostMap["4336857"],
    },
  });
  // 93. Wash Park/DU Studio w prvt entry
  await prisma.listing.upsert({
    where: { slug: "wash-park-du-studio-w-prvt-entry-17331962" },
    update: {},
    create: {
      slug: "wash-park-du-studio-w-prvt-entry-17331962",
      title: "Wash Park/DU Studio w prvt entry",
      description: "Garden-level studio near Wash Park, Gaylord St, Pearl St, and DU. You\u2019ll love its urban chic decor with exposed brick and beams. It can easily accommodate a couple, DU parents visiting the kids, or solo travelers. Private entry w/ kitchenette, 3/4 bath, 2 bikes, king bed, & queen sofa bed. Explore historic neighborhood shops and restaurants, or stay in for movie night on the large flatscreen with AppleTV.  Free assistance available for booking a car, tours, and restaurants. All are welcome here!",
      propertyType: "CABIN",
      pricePerNight: 81.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/baf629c4-6150-4059-9dba-05a7844b39bd.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "University, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68215,
      longitude: -104.96904,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 475,
      hostId: hostMap["117026480"],
    },
  });
  // 94. Cozy basement suite in beautiful garden setting!
  await prisma.listing.upsert({
    where: { slug: "cozy-basement-suite-in-beautiful-garden-setting-28695010" },
    update: {},
    create: {
      slug: "cozy-basement-suite-in-beautiful-garden-setting-28695010",
      title: "Cozy basement suite in beautiful garden setting!",
      description: "Enjoy a Denver escape in this private basement apartment with separate entrance. Located in desirable Sunnyside area in North Denver, it's a quick car/bike/scooter ride to Downtown Denver, Mile High, Coors Field, Pepsi Center. Walking distance to amazing restaurants and bars. Features 1 large bedroom with an attached second bedroom area separated by a curtain; full bath, kitchenette and ample dining/living/work space.",
      propertyType: "APARTMENT",
      pricePerNight: 85.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/35039195-da2c-45f3-89bb-68fc2f96b17a.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "FIREPLACE", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77092,
      longitude: -105.02385,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 473,
      hostId: hostMap["172528574"],
    },
  });
  // 95. Historic Luxury Getaway on Cheesman Park!
  await prisma.listing.upsert({
    where: { slug: "historic-luxury-getaway-on-cheesman-park-25770124" },
    update: {},
    create: {
      slug: "historic-luxury-getaway-on-cheesman-park-25770124",
      title: "Historic Luxury Getaway on Cheesman Park!",
      description: "Enjoy Historic Denver amongst the famous Humboldt Mansions!<br /><br />Fully remodeled in 2025, this garden apt is located in Denver's 1st Historic District. Our home is on the National Register of Historic Places and part of the Historical Society tour.<br />\t\u2022 Steps from Cheesman Park and bus stop\u2014no rental car needed!<br />\t\u2022 10 minutes downtown by bus or car. <br />        \u2022 Surrounded by restaurants, shops, and a dispensary<br /><br />The perfect blend of modern amenities and historic charm\u2014your Denver adventure starts here!",
      propertyType: "CABIN",
      pricePerNight: 118.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-25770124/original/ec0cb1c4-86b1-4672-9eaa-f2f1512b751c.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cheesman Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73395,
      longitude: -104.9692,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 470,
      hostId: hostMap["155712512"],
    },
  });
  // 96. Capitol Hill Loft - Walking distance to EVERYTHING
  await prisma.listing.upsert({
    where: { slug: "capitol-hill-loft-walking-distance-to-everything-20996662" },
    update: {},
    create: {
      slug: "capitol-hill-loft-walking-distance-to-everything-20996662",
      title: "Capitol Hill Loft - Walking distance to EVERYTHING",
      description: "Fun and Trendy Apartment in the perfect location!!  You will love the beauty and convenience to all your Denver desires! Incredibly close to the center of Downtown, shopping, restaurants, bars, nightclubs and concert venues.  One block away from the Ogden and Fillmore Theaters.  Nearby are the Colorado Convention Center and St Joseph/Presbyterian St Lukes Hospitals. <br />Dining and nightlife along 17th Street and miles of shopping on 16th Street Mall! Walking distance to all of downtown Denver!",
      propertyType: "APARTMENT",
      pricePerNight: 123.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjA5OTY2NjI=/original/723bf365-81cf-41ff-bae0-a8f64f1211c0.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "North Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7423,
      longitude: -104.97677,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 472,
      hostId: hostMap["151149715"],
    },
  });
  // 97. Stroll Capitol Hill from a Cozy Foursquare Home
  await prisma.listing.upsert({
    where: { slug: "stroll-capitol-hill-from-a-cozy-foursquare-home-18934488" },
    update: {},
    create: {
      slug: "stroll-capitol-hill-from-a-cozy-foursquare-home-18934488",
      title: "Stroll Capitol Hill from a Cozy Foursquare Home",
      description: "1 queen bed in bedroom, 2 twin beds in living room sofa. WIFI, TV w/cable included.  Keyless entry makes for an easy visit.<br /><br />The space is 1 block from a city bus stop and 2 blocks to Denver B-cycle. There is street parking, however we recommend walking, biking, or Uber/Lyft ride anywhere in the city. <br /><br />The space has a separate entrance with keyless entry. It is one bedroom, one bath, a kitchenette, and a living/dining room. You are welcome to use our outdoor spaces at your leisure. Laundry access can be made available on request. <br /><br />This is our home and we live upstairs.<br /><br />We are an easy train ride from Denver International Airport to Union Station, and then a $10 Uber ride to the house.<br /><br />The apartment has its own entry on the north side of the house. Guests will have access to the front porch and the back patio. Street parking only.<br /><br />Host lives in the top floors of the house and is available via airbnb messaging at all times. W",
      propertyType: "CABIN",
      pricePerNight: 111.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/monet/Select-18934488/original/2ea9e017-71fe-441b-8cc5-f6b7ef461048", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73696,
      longitude: -104.97826,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 465,
      hostId: hostMap["2086212"],
    },
  });
  // 98. Private Wash Park Basement Apartment
  await prisma.listing.upsert({
    where: { slug: "private-wash-park-basement-apartment-13901522" },
    update: {},
    create: {
      slug: "private-wash-park-basement-apartment-13901522",
      title: "Private Wash Park Basement Apartment",
      description: "Cozy one bedroom walking distance from Wash park and min from downtown bars/restaurants/nightlife etc. but tucked away in a quiet neighborhood. The light rail station is a 5 min walk from the front door making it super convenient to get to the airport/downtown/stadiums/ etc.<br />License #:<br />2017-BFN-0001417",
      propertyType: "APARTMENT",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/ec9f9267-ca9d-4c60-b26c-25e562636506.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Washington Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.69985,
      longitude: -104.98609,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.79,
      totalReviews: 482,
      hostId: hostMap["25549082"],
    },
  });
  // 99. Newly Constructed Downtown Carriage House
  await prisma.listing.upsert({
    where: { slug: "newly-constructed-downtown-carriage-house-33962911" },
    update: {},
    create: {
      slug: "newly-constructed-downtown-carriage-house-33962911",
      title: "Newly Constructed Downtown Carriage House",
      description: "Location, Location, Location<br />Fabulous newly constructed carriage house in the middle of the city! This one bed, one bath town home has radiant floor heat and air conditioning and it includes a full kitchen with dishes, utensils, pots and pans. You are able to walk to the capital, convention center (1 mile), 16th St. mall and various restaurants. You will be pleasantly surprised with how quiet the carriage house is considering the proximity to the city!  We are 420 friendly, but outdoors only!",
      propertyType: "APARTMENT",
      pricePerNight: 142.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/d225ae98-ece5-45c8-8e09-d6b6ebad3334.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "North Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74421,
      longitude: -104.97651,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 465,
      hostId: hostMap["125224431"],
    },
  });
  // 100. Denver, Berkeley, Regis Area, Private Studio Suite
  await prisma.listing.upsert({
    where: { slug: "denver-berkeley-regis-area-private-studio-suite-18811589" },
    update: {},
    create: {
      slug: "denver-berkeley-regis-area-private-studio-suite-18811589",
      title: "Denver, Berkeley, Regis Area, Private Studio Suite",
      description: "Street Level Artist Studio Apt. (600 SQ FT) Free Parking, Pvt. Entrance, no stairs, Pvt Bath, Kitchenette w/fridge, microwave, coffee maker.  King Bed & Queen Sofa Bed. Smart TV, Wi Fi, back yard BBQ picnic area, covered patio for smoking, 420 Friendly!  Walk to Regis Univ, 4 blocks to Willis Case Public Golf Course w/restaurant and bar, 15 Minute walk to Trendy Tennyson Ave Breweries, Shops, Restaurants, Parks, just 5 miles to Downtown, 1 block to RDT bus, with EZ access to all major roads.",
      propertyType: "CABIN",
      pricePerNight: 64.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-18811589/original/cfd34355-553a-4fbc-9fbc-ae3f74ffb944.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "KITCHEN", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Regis, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.79022,
      longitude: -105.04165,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 462,
      hostId: hostMap["130971585"],
    },
  });
  // 101. 2bd Luxury Carriage House in the Heart of Denver
  await prisma.listing.upsert({
    where: { slug: "2bd-luxury-carriage-house-in-the-heart-of-denver-46847951" },
    update: {},
    create: {
      slug: "2bd-luxury-carriage-house-in-the-heart-of-denver-46847951",
      title: "2bd Luxury Carriage House in the Heart of Denver",
      description: "Open, bright, modern carriage house steps from Downtown Denver to the East and a 5 minute walk to Denver's largest lake to the west. Full of luxurious details including brand new full kitchen, dual waterfall rain shower heads, plush queen Purple\u00ae mattresses in each bedroom and cozy sheets complete the luxury experience sure to make this your best night sleep.<br /><br />Start your Colorado adventure here. Conveniently located in a quiet neighborhood while still being steps from everything.",
      propertyType: "CABIN",
      pricePerNight: 137.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/e55b4c8c-0964-4b9b-ab0e-880eae5c14d3.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sloan Lake, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75056,
      longitude: -105.03722,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 458,
      hostId: hostMap["60414610"],
    },
  });
  // 102. Sonder Bryant | Two-Bedroom Apartment
  await prisma.listing.upsert({
    where: { slug: "sonder-bryant-two-bedroom-apartment-1105912882020906616" },
    update: {},
    create: {
      slug: "sonder-bryant-two-bedroom-apartment-1105912882020906616",
      title: "Sonder Bryant | Two-Bedroom Apartment",
      description: "Welcome Bryant \u2014 more than a stay, it's an experience. This property was newly built in 2023 and perfectly borders the Highland, Downtown, and Jefferson Park neighborhoods. You can work up a sweat in the fitness center and then cool down in the pool. Each apartment features floor-to-ceiling windows, in-suite laundry, and a Roku for streaming. You'll be a three-minute drive to Empower Field and Ball Arena. Whether you're here for a game or Mile High vibes, Bryant has you covered.",
      propertyType: "APARTMENT",
      pricePerNight: 210.0,
      cleaningFee: 32,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-1105912882020906616/original/3cd760bc-bfc0-4ba8-ab77-9b7478a90ede.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["POOL", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "HOT_TUB", "DRYER", "PARKING", "KITCHEN", "WASHER", "SMOKE_ALARM", "GYM", "TV"],
      address: "Jefferson Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75551541499648,
      longitude: -105.01800368487893,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.76,
      totalReviews: 478,
      hostId: hostMap["219524979"],
    },
  });
  // 103. Retro Pad by DU in Virginia Village
  await prisma.listing.upsert({
    where: { slug: "retro-pad-by-du-in-virginia-village-12972487" },
    update: {},
    create: {
      slug: "retro-pad-by-du-in-virginia-village-12972487",
      title: "Retro Pad by DU in Virginia Village",
      description: "Remodeled in 2023, this funky apartment in our home is separated from the upstairs with private keypad entrance. New kitchenette & bathroom, eating/work area, cozy living room and access to beautiful backyard. Location is steps to Light Rail, nestled between Downtown and the Denver Tech Center. As a basement unit in our house, best for low key couples, biz travelers, DU visitors, tourists, cannabis consumers, LGBTQ+ folks, honeymooners and Red Rocks concert goers. Ask to use Level 2 EV charger!",
      propertyType: "APARTMENT",
      pricePerNight: 82.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-12972487/original/8e1a92c3-b699-47ae-8f84-0941ac17f4b9.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "SMOKE_ALARM", "TV"],
      address: "Virginia Village, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68303,
      longitude: -104.92659,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 455,
      hostId: hostMap["71381744"],
    },
  });
  // 104. The b+b in the heart of Denver - Guest Room w/ bth
  await prisma.listing.upsert({
    where: { slug: "the-b-b-in-the-heart-of-denver-guest-room-w-bth-27267320" },
    update: {},
    create: {
      slug: "the-b-b-in-the-heart-of-denver-guest-room-w-bth-27267320",
      title: "The b+b in the heart of Denver - Guest Room w/ bth",
      description: "Guest bedroom w/ private  bathroom in a very modern townhome in the heart of downtown Denver. The room is equipped with a comfy bed with micro-fiber sheets and feather pillows. There is a small desk in the room for your use as well. The bathroom has big soft towels and a shower and bathtub. The room itself is on the third story of the home.",
      propertyType: "APARTMENT",
      pricePerNight: 72.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-27267320/original/0357bc19-b0b0-4de1-b5cf-f145cdf50757.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "FIREPLACE", "WIFI", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74912,
      longitude: -104.97205,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 451,
      hostId: hostMap["17500067"],
    },
  });
  // 105. The Kaleidoscope House
  await prisma.listing.upsert({
    where: { slug: "the-kaleidoscope-house-18501266" },
    update: {},
    create: {
      slug: "the-kaleidoscope-house-18501266",
      title: "The Kaleidoscope House",
      description: "A colorful and updated home built in 1885 features a large relaxing front porch that is 420 friendly.  The vibrant Highlands/LoHigh neighborhood has many great restaurants, coffee shops, brewery bars and yoga/fitness, all close by.  Walking distance (1-1.5 miles) away from the 3 sports arenas.",
      propertyType: "APARTMENT",
      pricePerNight: 72.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/732e23aa-a997-4179-851d-b49da276ee03.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76154,
      longitude: -105.01573,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 450,
      hostId: hostMap["86155912"],
    },
  });
  // 106. Private room In the heart of Denver
  await prisma.listing.upsert({
    where: { slug: "private-room-in-the-heart-of-denver-477016" },
    update: {},
    create: {
      slug: "private-room-in-the-heart-of-denver-477016",
      title: "Private room In the heart of Denver",
      description: "Business License #:  2017-BFN-0005776 .<br /><br />We LOVE our neighborhood.  We live in an 1892 Victorian duplex in a historic neighborhood in Capitol Hill.  We remodeled  20 years ago, so there's some old and some new. Our location is ideal if your activities are based in central Denver-you won't need a car if that's the case.",
      propertyType: "APARTMENT",
      pricePerNight: 59.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-477016/original/6c8b9a5d-e940-4753-8aad-7f52bfbff0fb.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74348,
      longitude: -104.97089,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 447,
      hostId: hostMap["10951"],
    },
  });
  // 107. Cherry Creek North Comfort
  await prisma.listing.upsert({
    where: { slug: "cherry-creek-north-comfort-12606455" },
    update: {},
    create: {
      slug: "cherry-creek-north-comfort-12606455",
      title: "Cherry Creek North Comfort",
      description: "Beautiful walking neighborhood close to Cherry Creek North shopping, dining and parks. The house  is a newly renovated 1924 mediterranean home with garden + backyard guest entrance.The guest apartment  includes the entire garden -level (windows all around) basement sharing the back entrance. There is no door separating the space, only a back staircase.Two bedrooms, one queen and one w/double +twin bunk beds, private hallway bathroom, Laundry w/washer+dryer, coffee maker, refrigerator +microwave.",
      propertyType: "APARTMENT",
      pricePerNight: 163.0,
      cleaningFee: 24,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-12606455/original/6e931ba8-cbce-4ce9-9e12-66be229da66f.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "EV_CHARGER", "HEATING", "BBQ_GRILL", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.72853,
      longitude: -104.95286,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 443,
      hostId: hostMap["47979834"],
    },
  });
  // 108. Hot Tub & Fabulous Yard! Near DU & Levitt!
  await prisma.listing.upsert({
    where: { slug: "hot-tub-fabulous-yard-near-du-levitt-28078819" },
    update: {},
    create: {
      slug: "hot-tub-fabulous-yard-near-du-levitt-28078819",
      title: "Hot Tub & Fabulous Yard! Near DU & Levitt!",
      description: "Lovely backyard w/ Hot Tub!<br /><br />Walking distance to food & drinks, close to Levitt Pavilion (free live music!) & Denver University. <br /><br />Renovated private basement studio apartment of a 1929 classic bungalow.  Full kitchen, bath, laundry.<br /><br />King size bed along with a huge couch.<br /><br />Enjoy the Colorado sunshine and beautiful backyard (smoking outside OK). <br /><br />The owner lives on the main level with his 2 friendly pups.<br /><br />Hot tub shared with upstairs residents + up to 2 guests in the unit above the garage.",
      propertyType: "CABIN",
      pricePerNight: 120.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjgwNzg4MTk=/original/aa84e840-2dc6-45ec-bd6f-e472f598d659.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "PARKING", "DRYER", "HOT_TUB", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Overland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.67561,
      longitude: -104.98849,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 446,
      hostId: hostMap["161582412"],
    },
  });
  // 109. Private lower level 2 bedroom suite
  await prisma.listing.upsert({
    where: { slug: "private-lower-level-2-bedroom-suite-756594" },
    update: {},
    create: {
      slug: "private-lower-level-2-bedroom-suite-756594",
      title: "Private lower level 2 bedroom suite",
      description: "NOT 420 (marijuana) friendly. Our private ground level suite has 2 bedrooms, 1 bathroom, access to a coffee bar (kitchenette) and a living room area. It is roomy, comfortable and clean.  We live upstairs and rent the finished basement.  Common areas include the back door, back yard and laundry room.  Our house is in an upscale neighborhood, convenient location close to public transportation and off-street parking. the ceilings are low, so extra tall people (over 6'1\") will be inconvenienced.",
      propertyType: "CABIN",
      pricePerNight: 75.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/12870826/1a8bf0ac_original.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "HOT_TUB", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "South Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74027,
      longitude: -104.91516,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 442,
      hostId: hostMap["3638426"],
    },
  });
  // 110. Cozy, Private Garden-Level Suite in Mayfair
  await prisma.listing.upsert({
    where: { slug: "cozy-private-garden-level-suite-in-mayfair-15846078" },
    update: {},
    create: {
      slug: "cozy-private-garden-level-suite-in-mayfair-15846078",
      title: "Cozy, Private Garden-Level Suite in Mayfair",
      description: "Clean, private garden-level suite includes bedroom w/queen bed, living room w/queen sofa sleeper, bathroom, and kitchenette. Access to patio, grill and fire pit. Close to hospitals, the zoo, botanic gardens, museums, theaters, and shopping. 15-min drive to downtown Denver and several Arts Districts. Walk to multiple excellent restaurants and grocery stores. Separate entrance. Pets welcome. NOTE FOR LONG STAYS - Not a full kitchen. Sink is in the laundry room. Set up for simple cooking only.",
      propertyType: "CABIN",
      pricePerNight: 105.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/f3598a5b-8223-4b61-8c1b-36cc0296e4a9.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Hale, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73512,
      longitude: -104.92318,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 438,
      hostId: hostMap["102649781"],
    },
  });
  // 111. Modern Guesthouse ♥ Garage Parking ♥ Walk To RiNo
  await prisma.listing.upsert({
    where: { slug: "modern-guesthouse-garage-parking-walk-to-rino-21667826" },
    update: {},
    create: {
      slug: "modern-guesthouse-garage-parking-walk-to-rino-21667826",
      title: "Modern Guesthouse \u2665 Garage Parking \u2665 Walk To RiNo",
      description: "Summer is here! Perfect location less than 2 miles from downtown Denver,  Coors Field and the RiNo district.  Breweries, restaurants, coffee shops and wineries within walking distance.  A quick walk to the Light Rail will take you to destinations within the greater metro area.  After exploring, return to your guesthouse with garage parking, full kitchen, walk-in tile shower, KING Bed,  private patio, washer/dryer, WiFi, and a few very SPECIAL amenities that you'll have to visit to discover.",
      propertyType: "CABIN",
      pricePerNight: 131.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/fb39769c-3d86-4527-be11-9974bb82f492.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["POOL", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76138,
      longitude: -104.96965,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 429,
      hostId: hostMap["43193247"],
    },
  });
  // 112. Cozy & Modern Luxurious 1 bedroom Guest Suite
  await prisma.listing.upsert({
    where: { slug: "cozy-modern-luxurious-1-bedroom-guest-suite-48296152" },
    update: {},
    create: {
      slug: "cozy-modern-luxurious-1-bedroom-guest-suite-48296152",
      title: "Cozy & Modern Luxurious 1 bedroom Guest Suite",
      description: "Come stay in our luxury guest suite. Our suite is located in a quiet neighborhood that is 5 minutes to downtown Denver with many restaurants & activities located within walking distance.  <br /><br />The suite is designed for a traveling business visit, a romantic getaway, or a family vacation in Denver.  We provide fast, high-speed, reliable internet, TVs with many streaming options, a fully functional kitchen, a private washer/dryer, access to a hot tub, and a Blackstone grill in the shared backyard.",
      propertyType: "CABIN",
      pricePerNight: 142.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-48296152/original/d4b19af7-5047-4534-b521-282392a5836d.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "HOT_TUB", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "PARKING", "WORKSPACE", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76637,
      longitude: -105.01875,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 429,
      hostId: hostMap["372227538"],
    },
  });
  // 113. Modern Private Guest Suite in Capitol Hill
  await prisma.listing.upsert({
    where: { slug: "modern-private-guest-suite-in-capitol-hill-43002470" },
    update: {},
    create: {
      slug: "modern-private-guest-suite-in-capitol-hill-43002470",
      title: "Modern Private Guest Suite in Capitol Hill",
      description: "Indulge in your own PRIVATE MODERN STUDIO in the heart of Denver's historic Capitol Hill neighborhood. 1 mile to downtown. Walking distance are countless bars, restaurants, parks and just 2 blocks from the famous Colfax Ave. Plenty of entertaining options including Ogden & Bluebird Theatre. PRIVATE entrance with seamless keyless entry. Upon entrance you\u2019ll find a soft queen size bed along with a mini fridge, Keurig coffee, 42 inch TV w/Roku, walk in closet & Private Bathroom. NO SHARED SPACE!",
      propertyType: "CABIN",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/fc24ee79-482d-4319-8fbf-0f9fe5fd5877.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73832,
      longitude: -104.97686,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 439,
      hostId: hostMap["162222305"],
    },
  });
  // 114. Lovely Asian-Inspired Private Floor
  await prisma.listing.upsert({
    where: { slug: "lovely-asian-inspired-private-floor-16163913" },
    update: {},
    create: {
      slug: "lovely-asian-inspired-private-floor-16163913",
      title: "Lovely Asian-Inspired Private Floor",
      description: "Your personal oasis in the heart of Denver.  You will have an entire floor to yourself, about 1000 sq feet w/ a private interior door separate from upstairs. Perfect for a business traveler, a couple, friends, or small family (+ 1 small child)<br />Complete lower level suite comes with huge master bedroom, plenty of closet and storage space, master bath, and sitting room. Tastefully decorated with pieces from my travels in Asia and Africa, you will feel truly at home in this warm private suite.",
      propertyType: "CABIN",
      pricePerNight: 99.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTYxNjM5MTM=/original/d31a2575-8ee0-40d3-8c9b-12f3363b0c82.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "North Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7579,
      longitude: -104.93859,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 432,
      hostId: hostMap["4321221"],
    },
  });
  // 115. Modern Loft in Historic Highlands
  await prisma.listing.upsert({
    where: { slug: "modern-loft-in-historic-highlands-10363495" },
    update: {},
    create: {
      slug: "modern-loft-in-historic-highlands-10363495",
      title: "Modern Loft in Historic Highlands",
      description: "You will love the tree lined historic neighborhood as you are just a stroll away from restaurants and night life.  <br />The loft was built in 2015 and you will enjoy 2 bedrooms & 1 bathroom. You will have your own private entrance and garage below the apartment and 2<br />bicycles ready for your use to discover Denver!",
      propertyType: "CABIN",
      pricePerNight: 137.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/4b32fa10-f586-469a-801c-0bef106f54d4.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76484,
      longitude: -105.01875,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 426,
      hostId: hostMap["53337369"],
    },
  });
  // 116. Urban Nest | hot tub | dog friendly | bikes & walk
  await prisma.listing.upsert({
    where: { slug: "urban-nest-hot-tub-dog-friendly-bikes-walk-4951295" },
    update: {},
    create: {
      slug: "urban-nest-hot-tub-dog-friendly-bikes-walk-4951295",
      title: "Urban Nest | hot tub | dog friendly | bikes & walk",
      description: "Newly remodeled & charming 1 bedroom beautifully bright basement apartment w/ exposed brick, private entrance in a fantastic location. Includes  an oasis-like courtyard, hot tub, grill, & bikes. Walking distance to parks, Botanic Gardens, coffee shops, & restaurants! Up to 2 dogs are welcome! Ideal for 2 people, possible for 3. No smoking inside/outside, including the courtyard. E-Vaping & edibles are encouraged! Private/separate basement unit & owner lives upstairs. Only the back door is shared",
      propertyType: "CABIN",
      pricePerNight: 129.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDk1MTI5NQ%3D%3D/original/5f05e033-54dd-4c3a-979b-b60f15f2994d.png", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "HOT_TUB", "WORKSPACE", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74205,
      longitude: -104.96191,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 432,
      hostId: hostMap["3543517"],
    },
  });
  // 117. Cannabis Friendly BnB Minutes From Downtown Denver
  await prisma.listing.upsert({
    where: { slug: "cannabis-friendly-bnb-minutes-from-downtown-denver-16516286" },
    update: {},
    create: {
      slug: "cannabis-friendly-bnb-minutes-from-downtown-denver-16516286",
      title: "Cannabis Friendly BnB Minutes From Downtown Denver",
      description: "This home is cannabis friendly indoors and out...<br /> <br />Located in Southwest Denver only 15 minutes from downtown with easy access to Red Rocks Amphitheater and the Rocky Mountains. Dispensaries, breweries, and distilleries are abundant. The newly constructed Levitt Pavilion is within a short walking distance boasting over 50 free concerts each summer. Come check it out!",
      propertyType: "APARTMENT",
      pricePerNight: 122.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/89307765-d1dc-4787-b20f-15e8554d4de1.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Ruby Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.6884,
      longitude: -105.01157,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 429,
      hostId: hostMap["68535175"],
    },
  });
  // 118. Cozy Base in Vibrant Family Home (1 or 2 bedrooms)
  await prisma.listing.upsert({
    where: { slug: "cozy-base-in-vibrant-family-home-1-or-2-bedrooms-12425017" },
    update: {},
    create: {
      slug: "cozy-base-in-vibrant-family-home-1-or-2-bedrooms-12425017",
      title: "Cozy Base in Vibrant Family Home (1 or 2 bedrooms)",
      description: "Enjoy a cozy, private guestroom in the basement of our spacious family home. With plenty of space for 1 or 2 & private bath, you'll have a warm welcome from your hosts & two whole floors separating you from the bedroom of our 10 year-old twin boys. Woohoo! <br />(Please note: We also have a second bedroom with a queen bed that can be added if your party needs it.  Cost is 10% less than 1st bedroom, bathroom is shared with 1st bedroom, though not with our family.  Please ask in your message!)",
      propertyType: "APARTMENT",
      pricePerNight: 48.0,
      cleaningFee: 7,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/3515df9c-923a-478c-b150-f3604c77481a.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "EV_CHARGER", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Clayton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76779,
      longitude: -104.95569,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 422,
      hostId: hostMap["10161902"],
    },
  });
  // 119. Modern apartment in LoHi
  await prisma.listing.upsert({
    where: { slug: "modern-apartment-in-lohi-12169927" },
    update: {},
    create: {
      slug: "modern-apartment-in-lohi-12169927",
      title: "Modern apartment in LoHi",
      description: "This modern and spacious apartment is in the best area in Denver! It comes fully furnished with a king bed and option of adding an air mattress. Close to everything, quiet and spacious, it's perfect for couples, small families and professionals. Please note that this is located underneath our main house. We do our best to be respectful of our renters, and make a special effort to be quiet during typical sleeping hours. However, we do have two young children who sometimes have their own agendas.",
      propertyType: "APARTMENT",
      pricePerNight: 89.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/f1cbc866-6e4b-4807-9f32-4032bc6dc503.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76645,
      longitude: -105.01507,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 431,
      hostId: hostMap["78356"],
    },
  });
  // 120. Downstairs Apt in N'hood Home - Downtown Denver
  await prisma.listing.upsert({
    where: { slug: "downstairs-apt-in-n-hood-home-downtown-denver-13656664" },
    update: {},
    create: {
      slug: "downstairs-apt-in-n-hood-home-downtown-denver-13656664",
      title: "Downstairs Apt in N'hood Home - Downtown Denver",
      description: "Our place is centrally located between LoDo, RiNo and City Park.  You\u2019ll love its close proximity  to all downtown attractions -  Restaurants, Breweries, Sports arenas, concert Venus and the 38th/Blake train to airport stop is 10 blocks north. <br /><br />The space is clean with a bedroom, living room, bath, laundry and kitchenette Wifi, cable, coffee. It is in the basement of our home. There are interior stairs with a privacy door at the top. The Basement Apt has it's own Private Exterior Entrance.<br />.",
      propertyType: "CABIN",
      pricePerNight: 99.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/2e6591f7-de52-419a-80fd-ce9e78c76dd3.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "HOT_TUB", "KITCHEN", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76119,
      longitude: -104.96797,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 430,
      hostId: hostMap["334357"],
    },
  });
  // 121. Denver airport spacious private room  fast cable
  await prisma.listing.upsert({
    where: { slug: "denver-airport-spacious-private-room-fast-cable-35879415" },
    update: {},
    create: {
      slug: "denver-airport-spacious-private-room-fast-cable-35879415",
      title: "Denver airport spacious private room  fast cable",
      description: "Private master bedroom and bathroom is in a quiet, clean, friendly neighborhood, about  15 mins to DIA airport, 14 mins to Children hospital, Anschutz Medical Campus, Rocky Mt Regional VA Medical Center, Gaylord Rockies Resort, near park, Denver downtown (20min by car, 30 mins by light rail), big shopping mall, restaurants. The master bedroom with big private bathroom is upstairs. Checkin after 5 PM. Checkout by 11:00 AM. The room is upstairs and the stairs has 15steps, not good for wheelchair",
      propertyType: "APARTMENT",
      pricePerNight: 63.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MzU4Nzk0MTU%3D/original/e60d091a-37bb-496c-a8bb-6851cc8f43af.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.79512,
      longitude: -104.77572,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.8,
      totalReviews: 432,
      hostId: hostMap["268797798"],
    },
  });
  // 122. Better than a Hotel! Rino /Downtown
  await prisma.listing.upsert({
    where: { slug: "better-than-a-hotel-rino-downtown-23388648" },
    update: {},
    create: {
      slug: "better-than-a-hotel-rino-downtown-23388648",
      title: "Better than a Hotel! Rino /Downtown",
      description: "Better than a hotel! Stay within walking distance from downtown & Rino art district shops, restaurants & Breweries! Walk to Rockies Stadium! This trendy room with memory foam Queen bed,  updated bathroom, flat screen tv, coffee bar and kitchenette is the perfect jumping off point to explore Denver. Whether you're in town for work or for play everything is just minutes away! Walk to Coors Field, Denver Central Market, Union station, some of Denvers best breweries and restaurants and more!",
      propertyType: "CABIN",
      pricePerNight: 77.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/2403829a-f0f7-4525-a12d-fdbb38929b79.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75707157060387,
      longitude: -104.98127177476441,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 425,
      hostId: hostMap["4272021"],
    },
  });
  // 123. Chic Palm Springs getaway near heart of Denver
  await prisma.listing.upsert({
    where: { slug: "chic-palm-springs-getaway-near-heart-of-denver-49095997" },
    update: {},
    create: {
      slug: "chic-palm-springs-getaway-near-heart-of-denver-49095997",
      title: "Chic Palm Springs getaway near heart of Denver",
      description: "Perfect for couples, adventurers, business travelers, and families with kids. Recently remodeled with a new bathroom, carpet, paint, recessed lighting, and large windows that make the space bright and welcoming. Private entrance. <br /><br />Amazing location close to breweries, restaurants, downtown, the Convention Center, Coors Field, Pepsi Center, Mile High Stadium, and City Park (with a zoo and museums). Central location, but not necessarily walkable to those locations - car, Uber, or Lyft recommended.",
      propertyType: "CABIN",
      pricePerNight: 93.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-49095997/original/fcae9419-9114-4e4b-8956-8d4d0bbe9762.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76333,
      longitude: -104.95996,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 427,
      hostId: hostMap["58098571"],
    },
  });
  // 124. Main Street City /Private jacuzzi/Walk to bars!
  await prisma.listing.upsert({
    where: { slug: "main-street-city-private-jacuzzi-walk-to-bars-29651605" },
    update: {},
    create: {
      slug: "main-street-city-private-jacuzzi-walk-to-bars-29651605",
      title: "Main Street City /Private jacuzzi/Walk to bars!",
      description: "Unique Downtown Denver Airbnb on iconic Colfax Ave\u2014America\u2019s longest, quirkiest street! Enjoy walkability to top bars, restaurants, and nightlife. Watch the city buzz from your private patio or relax in the private jacuzzi. Expect vibrant urban energy\u2014this HIGH NOISE -tolerant unit puts you in the heart of it all. Perfect for friends, couples, families, or business travel seeking a boutique city rental with skyline views and unbeatable location.",
      propertyType: "APARTMENT",
      pricePerNight: 139.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/ddd91113-185a-40bb-9faa-84f38bf645f1.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "HOT_TUB", "WASHER", "FIREPLACE", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "FIRST_AID_KIT", "SMOKE_ALARM"],
      address: "City Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74106,
      longitude: -104.97302,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.68,
      totalReviews: 440,
      hostId: hostMap["49223382"],
    },
  });
  // 125. Best Location HUGE 1 bedroom loft
  await prisma.listing.upsert({
    where: { slug: "best-location-huge-1-bedroom-loft-1801950" },
    update: {},
    create: {
      slug: "best-location-huge-1-bedroom-loft-1801950",
      title: "Best Location HUGE 1 bedroom loft",
      description: "Spacious and stylish 1-bedroom, 1.5-bathroom loft in the heart of Downtown Denver! Featuring 15-foot ceilings, oversized windows, and unique d\u00e9cor, this loft offers a perfect blend of comfort and charm. Enjoy top-tier convenience with dining, shops, and the Colorado Convention Center all within a 5-minute walk. Recent upgrades include two big-screen TVs, new kitchen, and modern chandeliers for added luxury. Whether you\u2019re here for work or play, this loft is your ideal downtown home base!",
      propertyType: "APARTMENT",
      pricePerNight: 134.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-1801950/original/8e298347-9681-43e2-aa80-e4c1949c0ee2.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "CBD, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74569,
      longitude: -104.99202,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 417,
      hostId: hostMap["9447036"],
    },
  });
  // 126. SkyLoft: A Unique Space in Denver
  await prisma.listing.upsert({
    where: { slug: "skyloft-a-unique-space-in-denver-38521249" },
    update: {},
    create: {
      slug: "skyloft-a-unique-space-in-denver-38521249",
      title: "SkyLoft: A Unique Space in Denver",
      description: "Welcome to SkyLoft! Whether you're visiting Denver for business, pleasure, or a little bit of both, we want to give you a special place to stay that has been specifically curated not to feel like your typical Airbnb. This place is very \"Denver\" and is centrally located,  just minutes from downtown Denver; Coors Field/Pepsi Center/Mile High Stadium; the RiNo Art District; shopping on South Broadway; the restaurants of Uptown; the Denver Zoo; City Park; as well as many other attractions.",
      propertyType: "CABIN",
      pricePerNight: 136.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 2,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/694592b5-f3a7-4a08-a1d8-03436c9f5558.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "Skyland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7603,
      longitude: -104.95684,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 408,
      hostId: hostMap["6498749"],
    },
  });
  // 127. Simple-Chic, Private bd/ba in hot Five Points
  await prisma.listing.upsert({
    where: { slug: "simple-chic-private-bd-ba-in-hot-five-points-36881170" },
    update: {},
    create: {
      slug: "simple-chic-private-bd-ba-in-hot-five-points-36881170",
      title: "Simple-Chic, Private bd/ba in hot Five Points",
      description: "Clean, simple chic, private bedroom and bathroom, hardwood floors, with its own private entrance, in an awesome neighborhood.   Located in hot Five Points, blocks away from RiNo, and steps from the light rail station.<br /><br />This is a small bedroom with a comfy QUEEN bed, better suited for the efficient and budget-conscious traveler looking for a clean comfortable space to recover from all day exploring.<br /><br />Guidebook setup with restaurants, bars, breweries and \u201cthings to do\u201d recommendations.",
      propertyType: "APARTMENT",
      pricePerNight: 48.0,
      cleaningFee: 7,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/b3f1f299-0228-42de-bc28-8a66877f8661.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76034,
      longitude: -104.97518,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.85,
      totalReviews: 417,
      hostId: hostMap["38793718"],
    },
  });
  // 128. Studio with Private Entrance Two Blocks from Light Rail
  await prisma.listing.upsert({
    where: { slug: "studio-with-private-entrance-two-blocks-from-light-rail-17498473" },
    update: {},
    create: {
      slug: "studio-with-private-entrance-two-blocks-from-light-rail-17498473",
      title: "Studio with Private Entrance Two Blocks from Light Rail",
      description: "A small budget-friendly stay featuring hanging planters, whitewashed brick, and soothing shades of mint and sage. Located just a short walk away from the light-rail which can take you to many restaurants, breweries and attractions.<br /><br />There is plenty of free street parking, generally right in front of the unit.<br /><br />We are usually home on the property and are available to assist when necessary.",
      propertyType: "CABIN",
      pricePerNight: 84.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-17498473/original/00bc8f84-a6ab-47f9-ba79-86ac4127895e.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Overland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.678434155836484,
      longitude: -104.98903974208837,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 409,
      hostId: hostMap["51768939"],
    },
  });
  // 129. 1884 Downtown Denver Abode on Light Rail Transit
  await prisma.listing.upsert({
    where: { slug: "1884-downtown-denver-abode-on-light-rail-transit-15766497" },
    update: {},
    create: {
      slug: "1884-downtown-denver-abode-on-light-rail-transit-15766497",
      title: "1884 Downtown Denver Abode on Light Rail Transit",
      description: "Beautiful private 1884 Cottage in the heart of downtown. Great for couples, business travelers, concert goers, skiers or anyone looking for a cozy place to stay. This 1 bedroom cottage is located just a block away from the light rail and plenty of parking makes travel a breeze. The Denver Convention Center, Pepsi Center, Sports Authority Fields, Coors Field and other hot spots are just a few minutes away! Smoking is allowed in the outside courtyards, patios and backyard only. No smoking inside.",
      propertyType: "APARTMENT",
      pricePerNight: 151.0,
      cleaningFee: 23,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU3NjY0OTc=/original/ffd0fc0f-49a0-49d9-970f-6edfd533f5ae.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75686264038086,
      longitude: -104.974853515625,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.64,
      totalReviews: 431,
      hostId: hostMap["63262656"],
    },
  });
  // 130. Large House w/ Arcade -Walk to Stadium & Breweries
  await prisma.listing.upsert({
    where: { slug: "large-house-w-arcade-walk-to-stadium-breweries-18018738" },
    update: {},
    create: {
      slug: "large-house-w-arcade-walk-to-stadium-breweries-18018738",
      title: "Large House w/ Arcade -Walk to Stadium & Breweries",
      description: "Originally built in 1912 this renovated, downtown house is walking distance to Mile High Stadium. Close to LoDo, the Convention Center, Coors Field,  Denver Zoo, Aquarium, Union Station, Pepsi Center, lots of breweries, and both the Art Museum and the Museum of Natural History.<br /><br />If you are looking for space and want to be close to the heart of Denver, then this is the place.",
      propertyType: "APARTMENT",
      pricePerNight: 361.0,
      cleaningFee: 54,
      serviceFee: 0,
      maxGuests: 16,
      bedrooms: 6,
      bathrooms: 3,
      beds: 10,
      images: ["https://a0.muscache.com/pictures/8150e8f0-ae5f-4365-b482-9268d1bb2fff.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "SECURITY_CAMERAS", "WASHER", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Jefferson Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75712,
      longitude: -105.02419,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 404,
      hostId: hostMap["20578951"],
    },
  });
  // 131. Private, Cozy and Quiet in the♥of Capital Hill
  await prisma.listing.upsert({
    where: { slug: "private-cozy-and-quiet-in-the-of-capital-hill-45724176" },
    update: {},
    create: {
      slug: "private-cozy-and-quiet-in-the-of-capital-hill-45724176",
      title: "Private, Cozy and Quiet in the\u2665of Capital Hill",
      description: "Enjoy our cozy, convenient and newly remodeled 900 sq/ft guest apartment, located just a few blocks from Cheesman Park, the Denver Botanic Garden, the Colorado State Capital, Molly Brown House, Downtown Denver, Restaurants, Bars, Concert Halls, and much more. We are located in one of Denver's most charming neighborhoods, just a few moments walk from the Governor's mansion, Governor's Park and some of Denver's most popular restaurants.",
      propertyType: "CABIN",
      pricePerNight: 134.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-45724176/original/40941117-0433-48ff-a199-321dcd604fd5.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cheesman Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73377,
      longitude: -104.97048,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 407,
      hostId: hostMap["50403533"],
    },
  });
  // 132. Cozy Private room in Super-Clean Home Near Airport
  await prisma.listing.upsert({
    where: { slug: "cozy-private-room-in-super-clean-home-near-airport-37915770" },
    update: {},
    create: {
      slug: "cozy-private-room-in-super-clean-home-near-airport-37915770",
      title: "Cozy Private room in Super-Clean Home Near Airport",
      description: "Owners live in the home. If you\u2019re okay with that, we\u2019d love to host you! Watch your apps on the Smart TV. We offer an electric blanket for extra coziness in winter. A walk-in closet with a mini refrigerator and coffee machine ready for you. You have your own dedicated bathroom, less than 5 steps away from your room. Please note that the main entrance is shared, no private entrance for this room. Street parking is available, usually in front of the of our home. Please no parking on driveway.",
      propertyType: "APARTMENT",
      pricePerNight: 57.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/67292150-dc75-48b6-b865-c29e5d99c779.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77649,
      longitude: -104.77702,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 398,
      hostId: hostMap["133083388"],
    },
  });
  // 133. Modern comfort,private entry, 1 bdrm, kitchen, DIA
  await prisma.listing.upsert({
    where: { slug: "modern-comfort-private-entry-1-bdrm-kitchen-dia-43686441" },
    update: {},
    create: {
      slug: "modern-comfort-private-entry-1-bdrm-kitchen-dia-43686441",
      title: "Modern comfort,private entry, 1 bdrm, kitchen, DIA",
      description: "New, modern apartment with designer finishes! 1 bedroom, 1 bath, kitchen, living & dining with a fireplace & private entrance! Fast Wi-Fi Inc. Close to all Denver has to offer. 15 mins from airport, 15 mins to Children's & Univ. Hospital, 10 min to The Gaylord Hotel, within 30 mins of downtown, zoo, aquarium, museums, convention center and sporting events. Light rail station and lots of food options and restaurants within 2 miles. You'll have everything you need in this home away from home!",
      propertyType: "CABIN",
      pricePerNight: 97.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/90881809-1fd3-4869-9817-7e85aac7ed33.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.79468,
      longitude: -104.74548,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 395,
      hostId: hostMap["329037890"],
    },
  });
  // 134. Cherry Creek Chic Retreat
  await prisma.listing.upsert({
    where: { slug: "cherry-creek-chic-retreat-13764044" },
    update: {},
    create: {
      slug: "cherry-creek-chic-retreat-13764044",
      title: "Cherry Creek Chic Retreat",
      description: "Cherry Cheek North has won the #1 walking score in Colorado with a 98.5 you will be loving that you can walk to 350 boutiques, shops, farmers market and  50+ restaurants!!! <br />Whether for business or pleasure, come visit the most sought after and safest neighborhood in all of Denver.  Surrounded by multi-million dollar houses, beautiful trees, and quiet streets, this listing will bring you back to Cherry Creek North! You can stay to ski, or visit one of the many festivals within walking distance",
      propertyType: "APARTMENT",
      pricePerNight: 264.0,
      cleaningFee: 40,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 2,
      bathrooms: 1,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/e4346b15-2e4d-4106-b888-5bace1011af6.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "WIFI", "SECURITY_CAMERAS", "WASHER", "GYM", "FIREPLACE", "PARKING", "DRYER", "PET_FRIENDLY", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Cherry Creek, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.72184,
      longitude: -104.95174,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 390,
      hostId: hostMap["8751405"],
    },
  });
  // 135. Private Guest Suite in the Heart Of Denver
  await prisma.listing.upsert({
    where: { slug: "private-guest-suite-in-the-heart-of-denver-34151881" },
    update: {},
    create: {
      slug: "private-guest-suite-in-the-heart-of-denver-34151881",
      title: "Private Guest Suite in the Heart Of Denver",
      description: "Welcome to your fully private studio in Historic Capitol Hill. \u2764\ufe0f You\u2019ll have your own entrance with keypad, and the unit is completely separate.  Central location, close to downtown, the bar scene, concert venues along Colfax and  steps away from tons of cool dining options. Huge private patio is the perfect spot for a morning coffee or an evening smoke :-)  We love puppers \ud83d\udc36 and allow small pets (25 pounds or less) for a small extra fee!",
      propertyType: "CABIN",
      pricePerNight: 69.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/2e21cc85-5cbc-4157-ad1d-b5da5f91b252.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73705,
      longitude: -104.97627,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.88,
      totalReviews: 392,
      hostId: hostMap["257668522"],
    },
  });
  // 136. The Nest at Sloan Lake
  await prisma.listing.upsert({
    where: { slug: "the-nest-at-sloan-lake-27554417" },
    update: {},
    create: {
      slug: "the-nest-at-sloan-lake-27554417",
      title: "The Nest at Sloan Lake",
      description: "Less than a mile from Mile High Stadium, the Shops at Highland Square, Sloans Lake, LoHi, RiNo, and Downtown Denver. Walk or Uber to the game, concert, lake, coffee, brewery, or restaurant.  No shortage of fun, food, and activities nearby.  Separate, locked upstairs unit with its own entrance.",
      propertyType: "APARTMENT",
      pricePerNight: 132.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/fe413856-33f4-4daf-a349-0813c9dbd54b.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sloan Lake, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75058,
      longitude: -105.03366,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 387,
      hostId: hostMap["156572511"],
    },
  });
  // 137. Private Apt/Shared Entrance/Blocks from Downtown
  await prisma.listing.upsert({
    where: { slug: "private-apt-shared-entrance-blocks-from-downtown-46943238" },
    update: {},
    create: {
      slug: "private-apt-shared-entrance-blocks-from-downtown-46943238",
      title: "Private Apt/Shared Entrance/Blocks from Downtown",
      description: "Location, Location, Location!  Your stay away from home is located in the garden level of my beautiful townhome.   You have your own guest suite with bed, bath, and living room area with kitchenette.  Located close to entertainment venues, hospitals, parks, and just a five minute walk to downtown Denver. Near lots of great restaurants (and VooDoo Doughnuts)!   Incredible walk score of 96 and bike score of 93!  Close enough to the city action but in a quiet corner.<br /><br />#OpenToAll",
      propertyType: "CABIN",
      pricePerNight: 107.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/ddb27e33-a39b-42e9-963e-5fc98967ef70.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "North Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.741207,
      longitude: -104.97644,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 382,
      hostId: hostMap["10653789"],
    },
  });
  // 138. Our Denver Sunnyside apartment
  await prisma.listing.upsert({
    where: { slug: "our-denver-sunnyside-apartment-16846436" },
    update: {},
    create: {
      slug: "our-denver-sunnyside-apartment-16846436",
      title: "Our Denver Sunnyside apartment",
      description: "Welcome to Denver.  Our one bedroom stand alone apartment is located in the popular Sunnyside Highlands, 2 miles and 10 minutes from downtown.  This comfortable second story apartment sits above a garage. It is equip with a full kitchen with a washer dryer combination machine.",
      propertyType: "APARTMENT",
      pricePerNight: 106.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/f79647f9-7bc6-4b60-8fd9-b517a3965dc2.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77337,
      longitude: -105.01605,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 383,
      hostId: hostMap["33666244"],
    },
  });
  // 139. Chill in an Inviting Eco Getaway with a Garden Hammock
  await prisma.listing.upsert({
    where: { slug: "chill-in-an-inviting-eco-getaway-with-a-garden-hammock-17325994" },
    update: {},
    create: {
      slug: "chill-in-an-inviting-eco-getaway-with-a-garden-hammock-17325994",
      title: "Chill in an Inviting Eco Getaway with a Garden Hammock",
      description: "Pluck a book from the open shelves and sink into a mid-century armchair for some downtime at a travel inspired design and relaxed residence with some accent exposed brick, natural wood, and green credentials. Built in 1907 and professionally remodeled with design inspiration from travels around the globe. This fresh, charming bolthole boasts 100% wind power,  recycling and hygge comfort inside and out.<br /><br />Our guests have full access to the kitchen, living room, dining area, sunroom, yard and gardens.<br /><br />Our goal is always to make your stay as easy and comfortable as possible. We enjoy socializing with our guests and sharing info and advice about exploring Denver and Colorado. When not at home, we are available by phone, text and email to answer questions or provide suggestions.<br /><br />The property is walkable to City Park, the zoo, the Science Museum, coffee spots including River and Roads or Ephemeral Tap Room and a range of eateries. Head to Cafe Miriam for amazin",
      propertyType: "APARTMENT",
      pricePerNight: 85.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/fe106dd2-1cac-4388-9282-a2b2e651a261.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "EV_CHARGER", "FIRE_EXTINGUISHER", "WORKSPACE", "WIFI", "SECURITY_CAMERAS", "WASHER", "FIREPLACE", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "CARBON_MONOXIDE_ALARM", "TV", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "SMOKE_ALARM"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75827,
      longitude: -104.96106,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 380,
      hostId: hostMap["7883078"],
    },
  });
  // 140. Sit Fireside in a Hip Guesthouse with a Balcony
  await prisma.listing.upsert({
    where: { slug: "sit-fireside-in-a-hip-guesthouse-with-a-balcony-26351023" },
    update: {},
    create: {
      slug: "sit-fireside-in-a-hip-guesthouse-with-a-balcony-26351023",
      title: "Sit Fireside in a Hip Guesthouse with a Balcony",
      description: "After a long day of skiing, hiking, or sightseeing, kick back fireside, cocktail in-hand, in a living room featuring rustic-chic modern furnishings. Enjoy morning coffee on the balcony or out on the garden patio of this guesthouse",
      propertyType: "CABIN",
      pricePerNight: 141.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/68ba5652-035c-4e79-886a-e7c14bc91c19.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Rosedale, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.669857025146484,
      longitude: -104.98519897460938,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 379,
      hostId: hostMap["576644"],
    },
  });
  // 141. Double Master Unit in Gorgeous Victorian Mansion
  await prisma.listing.upsert({
    where: { slug: "double-master-unit-in-gorgeous-victorian-mansion-15743145" },
    update: {},
    create: {
      slug: "double-master-unit-in-gorgeous-victorian-mansion-15743145",
      title: "Double Master Unit in Gorgeous Victorian Mansion",
      description: "An 1886 Victorian brick mansion, updated with modern convenience & style. This unit is a double master which spans two floors with a master suite downstairs including bath with jetted tub & shower & another master suite upstairs with jetted tub and skylighted shower. There are also two queen sleeper sofas with memory foam mattresses. The two TV's have Netflix subscriptions and a Roku for other shows. Wireless is screaming fast. There is a private deck through french doors with a skyline view.",
      propertyType: "APARTMENT",
      pricePerNight: 124.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 8,
      bedrooms: 2,
      bathrooms: 2,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/d7af6dcb-5934-4b56-bd8e-75a420c6a401.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.770382,
      longitude: -104.96701,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 383,
      hostId: hostMap["6294270"],
    },
  });
  // 142. Quiet/Cozy/Cats/Yoga! Private Room Near Downtown
  await prisma.listing.upsert({
    where: { slug: "quiet-cozy-cats-yoga-private-room-near-downtown-27797372" },
    update: {},
    create: {
      slug: "quiet-cozy-cats-yoga-private-room-near-downtown-27797372",
      title: "Quiet/Cozy/Cats/Yoga! Private Room Near Downtown",
      description: "Come and enjoy a COMFY BED in a PRIVATE BASEMENT SUITE with a DUAL HEAD SHOWER! The shower is unreal...for real.<br /><br />Guest are welcome to free tickets to the Denver Art Museum and Denver Botanic Gardens! <br /><br />We also feature a YOGA STUDIO on site with public classes and private options. Use of the studio is additional cost.<br /><br />You have your own mini refrigerator, coffee maker (with coffee), and access to the washer/dryer and backyard patio area.<br /><br />We have 3 cats that roam around the house and backyard :)",
      propertyType: "APARTMENT",
      pricePerNight: 48.0,
      cleaningFee: 7,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-27797372/original/f7cc7d2f-1884-4de5-9505-058247e07390.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WASHER", "GYM", "SMOKE_ALARM", "TV"],
      address: "Northeast Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76484,
      longitude: -104.93672,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 377,
      hostId: hostMap["33036680"],
    },
  });
  // 143. A Tiny Slice of Heaven
  await prisma.listing.upsert({
    where: { slug: "a-tiny-slice-of-heaven-53309020" },
    update: {},
    create: {
      slug: "a-tiny-slice-of-heaven-53309020",
      title: "A Tiny Slice of Heaven",
      description: "Have you always wanted to know what it's like to live in a container home? Now\u2019s the chance!<br />This GORGEOUS Tiny Home could be your own slice of heaven. Enjoy this beautifully decorated studio container tiny home with french doors that open up to your own private yard, a spacious bathroom & queen size bed. A fully equipped kitchen & all the little touches to make your stay in Denver extra special.<br />We are a 10 min drive from Union Station & a 25 min drive from the airport.",
      propertyType: "APARTMENT",
      pricePerNight: 129.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/09859e1e-4b2b-4bbe-a4e8-df7c373a5023.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Berkeley, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77896,
      longitude: -105.0346,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 378,
      hostId: hostMap["109534927"],
    },
  });
  // 144. Newly Updated - Private suite with sun room(s)
  await prisma.listing.upsert({
    where: { slug: "newly-updated-private-suite-with-sun-room-s-33907546" },
    update: {},
    create: {
      slug: "newly-updated-private-suite-with-sun-room-s-33907546",
      title: "Newly Updated - Private suite with sun room(s)",
      description: "My newly re-finished home offers its bright sunroom(s) for socializing with hotel style queen pull out couch and a cozy finished basement queen suite for resting. Located in Northwest Denver, right next to I-70, means easy access to downtown (a 5 minute drive), ski resorts in the Rocky Mountains, and Boulder. This house believes in conserving energy and resources, including a xeriscaped front yard and composting. It is friendly and accepting of all people, especially marginalized communities.",
      propertyType: "CABIN",
      pricePerNight: 87.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/e681c555-1c51-4627-8bda-4b9845f32666.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Chaffee Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7842,
      longitude: -105.0155,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 380,
      hostId: hostMap["7343682"],
    },
  });
  // 145. Hip Denver Studio - Skyland Neighborhood
  await prisma.listing.upsert({
    where: { slug: "hip-denver-studio-skyland-neighborhood-40399309" },
    update: {},
    create: {
      slug: "hip-denver-studio-skyland-neighborhood-40399309",
      title: "Hip Denver Studio - Skyland Neighborhood",
      description: "Come stay at our hip little 2nd story studio space. Enjoy the Denver skyline & Rocky Mountains right outside your windows. We are a block off Denver's City Park golf course near the Denver Zoo & Denver Museum of Nature & Science. We are also close to downtown Denver. Our studio space is brand new and accessible through our backyard with a keyless entry system. Our dogs - Jack Jack and Sophie Nacho - may welcome you but there is a gate closing in the space so they won\u2019t be greeting you close up!",
      propertyType: "CABIN",
      pricePerNight: 76.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-40399309/original/ce43f15e-03d6-4b2e-8899-315bae2d804e.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Skyland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75604,
      longitude: -104.95734,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 376,
      hostId: hostMap["3585963"],
    },
  });
  // 146. Modern Suite in Denver’s Art District I Walkable
  await prisma.listing.upsert({
    where: { slug: "modern-suite-in-denver-s-art-district-i-walkable-49641472" },
    update: {},
    create: {
      slug: "modern-suite-in-denver-s-art-district-i-walkable-49641472",
      title: "Modern Suite in Denver\u2019s Art District I Walkable",
      description: "Stylish guest suite in Denver\u2019s lively Santa Fe Art District\u2014just steps from Broadway, galleries, theaters, and local dining. Perfect for travelers, this private retreat blends modern comfort with artistic charm. Enjoy top walkability (93 WalkScore/94 BikeScore), easy self check-in, smart TV, and a secure private entrance. Only 5\u201310 minutes to RiNo, Downtown, or the Convention Center, and a quick $7\u201310 ride share away.",
      propertyType: "CABIN",
      pricePerNight: 133.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-49641472/original/38efb35d-af77-4d8a-aec8-0a6db1f9b0f1.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "WIFI", "TV", "PARKING", "FIRST_AID_KIT", "BABY_GEAR", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71738,
      longitude: -104.98502,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.81,
      totalReviews: 386,
      hostId: hostMap["72164908"],
    },
  });
  // 147. Private Carriage house in heart of RiNO & Downtown
  await prisma.listing.upsert({
    where: { slug: "private-carriage-house-in-heart-of-rino-downtown-47337599" },
    update: {},
    create: {
      slug: "private-carriage-house-in-heart-of-rino-downtown-47337599",
      title: "Private Carriage house in heart of RiNO & Downtown",
      description: "Stay in a fully renovated 400 sq ft private carriage house in Denver\u2019s historic Five Points. Walk to the RiNo Art District (4 blocks), Downtown (5 blocks), and several Michelin-recognized restaurants. 10+ breweries and distilleries nearby. Enjoy a full kitchen, private balcony, fast Wi-Fi, Netflix, and easy self check-in. No car needed\u201490 Walk Score, 98 Bike Score. Safe for solo travelers. Quick $5\u201310 Lyft/Uber to the Highlands or LoHi. A perfect urban retreat!",
      propertyType: "CABIN",
      pricePerNight: 114.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/e2016c09-d04e-4a41-a931-1804c6c9f1b9.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75253,
      longitude: -104.98348,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 376,
      hostId: hostMap["105144406"],
    },
  });
  // 148. The Studio | Denver
  await prisma.listing.upsert({
    where: { slug: "the-studio-denver-547965961681084556" },
    update: {},
    create: {
      slug: "the-studio-denver-547965961681084556",
      title: "The Studio | Denver",
      description: "This is a backyard studio apartment with high ceilings, plenty of light and lots of privacy. The entrance to the studio is accessed through an alley, with street parking an easy 1/2 block walk away. <br /><br />Conveniently located to the 38th and Blake Street \"A\" Train, RINO Arts District, York Street Yards and all the breweries and fun of central Denver, Colorado. You are a hop, skip and a jump to I-70 and the fast track to the Rocky Mountains.",
      propertyType: "CABIN",
      pricePerNight: 103.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-547965961681084556/original/5c75b7e5-a4eb-4594-8728-ddacbbcf51ba.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Clayton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76724,
      longitude: -104.95964,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.93,
      totalReviews: 376,
      hostId: hostMap["106954633"],
    },
  });
  // 149. Stand-Alone Cottage w/ Fenced Patio & Yard Oasis
  await prisma.listing.upsert({
    where: { slug: "stand-alone-cottage-w-fenced-patio-yard-oasis-44293043" },
    update: {},
    create: {
      slug: "stand-alone-cottage-w-fenced-patio-yard-oasis-44293043",
      title: "Stand-Alone Cottage w/ Fenced Patio & Yard Oasis",
      description: "Enjoy comfort & style in our thoughtfully designed guest suite with its own patio.  Nestled in a vibrant neighborhood, our suite offers a perfect blend of convenience and tranquility.<br /><br />Our location is ideally situated near Downtown Denver, Mile High, Coors Field, Ball Arena & Red  Rocks. <br /> <br />Whether you\u2019re here for business or leisure our guest suite provides the perfect home base for your Denver or Mountain adventure. Book your stay and experience the charm of our welcoming suite & outdoor area.",
      propertyType: "CABIN",
      pricePerNight: 138.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 0,
      bathrooms: 1,
      beds: 7,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-44293043/original/3897786a-4438-45ef-b73c-d7d16f8e20f2.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Berkeley, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7726994,
      longitude: -105.0343738,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 378,
      hostId: hostMap["6807612"],
    },
  });
  // 150. Kasa | 1BD, Catch a Game at Empower Field | Denver
  await prisma.listing.upsert({
    where: { slug: "kasa-1bd-catch-a-game-at-empower-field-denver-44334732" },
    update: {},
    create: {
      slug: "kasa-1bd-catch-a-game-at-empower-field-denver-44334732",
      title: "Kasa | 1BD, Catch a Game at Empower Field | Denver",
      description: "Located in the stylish LoDo neighborhood, Kasa Union Station is just steps away from a number of exciting local attractions. Nearby attractions include; Coors Field, where you can catch a Rockies game in the summer, and Empower Field, home to the Denver Broncos. Watch a game or grab a beer at a local brewery with Kasa as your home base! Our tech-enabled apartments offer self check-in at 4pm, 24/7 guest support by text, phone, or chat, and a Virtual Front Desk accessed via mobile device.",
      propertyType: "APARTMENT",
      pricePerNight: 999.0,
      cleaningFee: 150,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-44334732/original/db3890d9-6c03-4692-a22b-3af6413740e5.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["EV_CHARGER", "FIRE_EXTINGUISHER", "WORKSPACE", "WIFI", "WASHER", "GYM", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "TV", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "AIR_CONDITIONING", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Union Station, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75627,
      longitude: -105.0047,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.71,
      totalReviews: 393,
      hostId: hostMap["88566861"],
    },
  });
  // 151. Sunny Highlands Home Brimming with Style
  await prisma.listing.upsert({
    where: { slug: "sunny-highlands-home-brimming-with-style-29830102" },
    update: {},
    create: {
      slug: "sunny-highlands-home-brimming-with-style-29830102",
      title: "Sunny Highlands Home Brimming with Style",
      description: "Head upstairs to escape into the Hightop House. The sunny, vaulted space overlooks bustling 32nd Avenue in the heart of Denver's popular Highlands neighborhood. Bold pops of color and artfully curated pieces enhance a loft-like living space with skylights. The thoughtfully designed space is equally comfortable for one guest staying a single night or for a group of friends settling in for a week or more. Come stay with us!",
      propertyType: "CABIN",
      pricePerNight: 169.0,
      cleaningFee: 25,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/abed50de-f166-492b-b3d4-dc5b5d3f6cb0.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "West Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76195,
      longitude: -105.03986,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 370,
      hostId: hostMap["1750207"],
    },
  });
  // 152. LOHI -Walk to everything-Private Comfy Suite for 2
  await prisma.listing.upsert({
    where: { slug: "lohi-walk-to-everything-private-comfy-suite-for-2-31488847" },
    update: {},
    create: {
      slug: "lohi-walk-to-everything-private-comfy-suite-for-2-31488847",
      title: "LOHI -Walk to everything-Private Comfy Suite for 2",
      description: "2019-BFN-0007934  - LoHi Guest Suite -  1 BD/ 1BA apt. w/ private entrance in the basement level of our home w/ kitchenette, living rm w/ TV (Firestick), Fast WIFI, Work space w/ desk & printer. Great location in the center of Lower Highlands (LoHi) neighborhood, 2-3 blocks to many bars, restaurants, coffee shops, bus stop.  20-30 minute walk to Union Station & LoDo.  5 min Uber to center of downtown & RiNo.  Quiet & friendly street, parking on street. Potential for noise, you are below others.",
      propertyType: "CABIN",
      pricePerNight: 86.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-31488847/original/5cd31145-1ca3-43fd-a3fc-3d55f1cd65cf.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76425,
      longitude: -105.01333,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 369,
      hostId: hostMap["12194428"],
    },
  });
  // 153. Western speakeasy❤of WashPark⚡Wi-Fi☀️outdoor space
  await prisma.listing.upsert({
    where: { slug: "western-speakeasy-of-washpark-wi-fi-outdoor-space-43552843" },
    update: {},
    create: {
      slug: "western-speakeasy-of-washpark-wi-fi-outdoor-space-43552843",
      title: "Western speakeasy\u2764of WashPark\u26a1Wi-Fi\u2600\ufe0foutdoor space",
      description: "An Airbnb in Denver, Colorado like no other!<br /><br />Step back in time while enjoying modern conveniences in a one-of-a-kind western-styled speakeasy getaway.<br /><br />This is the Denver Airbnb you've been looking for.<br /><br />Ready for a relaxing, peaceful staycation? Looking for a work from home alternative?<br /><br />Need a comfortable workspace with fast wifi at an Airbnb in Denver that's suitable for children? And pups?<br /><br />The historic Washington Park Speakeasy gives you all this. Plus unmatched cleanliness. Free parking.",
      propertyType: "APARTMENT",
      pricePerNight: 94.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/7ffbd11c-cf3a-459a-8fa9-6a119e95973c.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "PARKING", "WORKSPACE", "FIRST_AID_KIT", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Washington Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.69277,
      longitude: -104.96128,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 368,
      hostId: hostMap["2440834"],
    },
  });
  // 154. Fresh & Cozy Studio Guesthouse; dedicated parking
  await prisma.listing.upsert({
    where: { slug: "fresh-cozy-studio-guesthouse-dedicated-parking-52702841" },
    update: {},
    create: {
      slug: "fresh-cozy-studio-guesthouse-dedicated-parking-52702841",
      title: "Fresh & Cozy Studio Guesthouse; dedicated parking",
      description: "Lovely, detached studio carriage house in central Denver.  Clean, newly restored studio unit located on second floor above detached garage.  Enjoy coffee and meals on your elevated deck.  Access to ground-level patio.   Grounds surrounding the main house are filled with blooming gardens and peaceful ambience. Ten minutes from downtown Denver amenities (LoDo, 16th Street Mall, etc.). Walking distance to glorious Washington Park.  Neighborhood restaurants abound. Free, dedicated parking.",
      propertyType: "CABIN",
      pricePerNight: 75.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-52702841/original/f3eb5d51-e88c-4eb8-827b-d137127d61a6.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7122,
      longitude: -104.97983,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 370,
      hostId: hostMap["426625975"],
    },
  });
  // 155. Capitol Hill/Downtown Denver Condo, Cozy.
  await prisma.listing.upsert({
    where: { slug: "capitol-hill-downtown-denver-condo-cozy-17831437" },
    update: {},
    create: {
      slug: "capitol-hill-downtown-denver-condo-cozy-17831437",
      title: "Capitol Hill/Downtown Denver Condo, Cozy.",
      description: "The most Cozy and Charming 1 bedroom condo in the Capital Hill district near downtown Denver. Perfect for a couple with an extra space for a guest if needed.  It is approximately a 10 minute walk to downtown including the 16th street mall which features a variety of restaurants, bars, shops, etc.  Also within walking distance you can find the Denver Art Museum, Denver Public Library, and the History Colorado Center.",
      propertyType: "APARTMENT",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/f2171350-c8ba-434e-8ce9-a7c947c571e3.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7385,
      longitude: -104.9801,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 374,
      hostId: hostMap["41486741"],
    },
  });
  // 156. Bed, Bath and Hot Tub with Private Entrance
  await prisma.listing.upsert({
    where: { slug: "bed-bath-and-hot-tub-with-private-entrance-12002460" },
    update: {},
    create: {
      slug: "bed-bath-and-hot-tub-with-private-entrance-12002460",
      title: "Bed, Bath and Hot Tub with Private Entrance",
      description: "Peaceful, large bedroom/bath with private entrance off the gorgeous garden in 1930s vintage home. Close to several medical centers such as National Jewish, Rose Medical Center, Children's Hospital, and University Hospital. We are a few blocks from bus routes, coffee shops, concert venues (bluebird, Ogden, Fillmore) and fun restaurants. <br /><br />fast Wifi, TV, microwave, fridge and hot tub. The room has a new king-size bed and self-controlled air conditioner/heater for maximum comfort. Not 420 friendly.",
      propertyType: "APARTMENT",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-12002460/original/b1cbf9df-f924-4913-a565-308d34786786.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "PARKING", "DRYER", "HOT_TUB", "FIRE_EXTINGUISHER", "BABY_GEAR", "KITCHEN", "WORKSPACE", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Hale, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73222,
      longitude: -104.9237,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 370,
      hostId: hostMap["10387069"],
    },
  });
  // 157. Fun Location in Five Points
  await prisma.listing.upsert({
    where: { slug: "fun-location-in-five-points-34472104" },
    update: {},
    create: {
      slug: "fun-location-in-five-points-34472104",
      title: "Fun Location in Five Points",
      description: "Fantastic location near downtown Denver, RiNo, Larimer Square, Coors Field and much more. <br />Located in Denver\u2019s historic Five Points neighborhood. Steps away is access to the Light Rail Train, restaurants, bars, breweries and music venues. <br />Private carriage house space above garage.<br /><br />2019-BFN-0008194",
      propertyType: "CABIN",
      pricePerNight: 87.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/a8f3cf2f-e9e2-491a-8a4f-c46e7e70ee30.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "SMOKE_ALARM", "TV"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75525,
      longitude: -104.97694,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 363,
      hostId: hostMap["260210753"],
    },
  });
  // 158. King Suite w/ Full Bath. 20 mins to Red Rocks!
  await prisma.listing.upsert({
    where: { slug: "king-suite-w-full-bath-20-mins-to-red-rocks-10061459" },
    update: {},
    create: {
      slug: "king-suite-w-full-bath-20-mins-to-red-rocks-10061459",
      title: "King Suite w/ Full Bath. 20 mins to Red Rocks!",
      description: "Welcome Summer Concert Goers! 8 minutes to Levitt Pavilion, 20 minutes to Red Rocks! Ideal for travelers looking to enjoy Denver and the Colorado mountains in one visit. Downtown and mountain access without the downtown or mountain town prices! 5-10 minutes from Downtown, 20 minutes from Red Rocks, about an hour from Summit County. Perfect location for travelers seeking easy access to all our city and mountains have to offer.",
      propertyType: "CABIN",
      pricePerNight: 64.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/e500b959-ef76-4ab8-b2e3-3876d3038de7.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Barnum West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.72107,
      longitude: -105.04155,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.85,
      totalReviews: 372,
      hostId: hostMap["51532358"],
    },
  });
  // 159. Clean, quiet studio in central location w/ parking
  await prisma.listing.upsert({
    where: { slug: "clean-quiet-studio-in-central-location-w-parking-52011644" },
    update: {},
    create: {
      slug: "clean-quiet-studio-in-central-location-w-parking-52011644",
      title: "Clean, quiet studio in central location w/ parking",
      description: "Start your morning with a cup of coffee on the patio before meandering to Washington Park where you can wander the flower garden, get in a morning run, or rent a stand-up paddleboard and cruise the lake. After spending the day exploring Denver, gear up for a night out on nearby South Broadway -- one of Denver's most eclectic stretches of bars, restaurants, venues and shops. Finally, head home and curl up in a comfy queen bed in the private, detached studio you'll have all to yourself!",
      propertyType: "CABIN",
      pricePerNight: 94.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-52011644/original/aa6b45a1-2daa-48fe-9824-25ef3507bd99.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "TV"],
      address: "Washington Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71107,
      longitude: -104.97702,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 363,
      hostId: hostMap["29103624"],
    },
  });
  // 160. Beautiful suite,  private patio & entry, Denver
  await prisma.listing.upsert({
    where: { slug: "beautiful-suite-private-patio-entry-denver-20027486" },
    update: {},
    create: {
      slug: "beautiful-suite-private-patio-entry-denver-20027486",
      title: "Beautiful suite,  private patio & entry, Denver",
      description: "The suite has it's own patio, private entrance and is separate from the main house.  The suite includes a bedroom, sitting room, and bath room.  We provide a coffee machine, coffee, candy and a small wine fridge.  The suite is within 15 minutes of Downtown, LoDo, Rino, City Park, Stapleton and Lowry Town Centers, museums, zoo, and The Cherry Creek Shopping District.  There are lots of nearby restaurants/bars/breweries.",
      propertyType: "CABIN",
      pricePerNight: 62.0,
      cleaningFee: 9,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/34cc3df7-60f7-4f73-b423-67072554e703.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "South Park Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74157,
      longitude: -104.90628,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.92,
      totalReviews: 365,
      hostId: hostMap["71512884"],
    },
  });
  // 161. Brand New Guest Suite Minutes from Downtown Denver
  await prisma.listing.upsert({
    where: { slug: "brand-new-guest-suite-minutes-from-downtown-denver-625441329227604900" },
    update: {},
    create: {
      slug: "brand-new-guest-suite-minutes-from-downtown-denver-625441329227604900",
      title: "Brand New Guest Suite Minutes from Downtown Denver",
      description: "Enjoy a short (or long!) stay at my guest suite in Sloan's Lake. Whether in town for work, a concert, or just a quick get-away, you'll find everything you need in this guest suite w/ kitchenette. Empower Field (Mile High) is a 7 minute walk, Sloan's Lake is a 15 minute walk, and downtown Denver is a 5 to 10 minute Uber or Lyft.  I live a quiet life in the upstairs of the house with my dog so will be around in the event you need anything!",
      propertyType: "CABIN",
      pricePerNight: 97.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-625441329227604900/original/3a1ae063-0740-432f-b095-72ab6a72f499.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "West Colfax, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7435,
      longitude: -105.02734,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 5.0,
      totalReviews: 359,
      hostId: hostMap["14874662"],
    },
  });
  // 162. Wash Park Apt - Premium Location Private Entrance
  await prisma.listing.upsert({
    where: { slug: "wash-park-apt-premium-location-private-entrance-22100613" },
    update: {},
    create: {
      slug: "wash-park-apt-premium-location-private-entrance-22100613",
      title: "Wash Park Apt - Premium Location Private Entrance",
      description: "A clean lock off studio apartment that has it's own private entrance and is separate from the rest of the house.  <br /><br />Located in the Wash Park neighborhood, it's 2 blocks from the ever popular Bonnie Brae Ice Cream, 3 blocks from the South Gaylord Street shops and restaurants (7), and seven blocks from Washington Park.  <br /><br />About a mile from DU, and the Cherry Creek Mall and Cherry Creek North area of Denver. Centrally located with easy access to I-25, downtown, and the Denver Tech Center.",
      propertyType: "APARTMENT",
      pricePerNight: 106.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MjIxMDA2MTM%3D/original/a0420038-605e-4670-960a-3ffbb2c4d931.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "FIREPLACE", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "TV"],
      address: "Washington Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.70402,
      longitude: -104.9612,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 363,
      hostId: hostMap["23977016"],
    },
  });
  // 163. Private Entrance Guest Suite with parking
  await prisma.listing.upsert({
    where: { slug: "private-entrance-guest-suite-with-parking-11295273" },
    update: {},
    create: {
      slug: "private-entrance-guest-suite-with-parking-11295273",
      title: "Private Entrance Guest Suite with parking",
      description: "Your space is in the basement of our home with a private keyless entrance and includes a private off street parking spot. Lyft or Uber, are never more than a one or two minute wait. Downtown is within a 20 minute walk. Smoking is allowed outside (420 friendly).  Your suite is self contained with everything you need to be comfortable.  You will receive your entry code on the day of your arrival after we have your arrival and departure times.",
      propertyType: "CABIN",
      pricePerNight: 104.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/f93238f7-6242-493b-b171-b2fdc5fa61ec.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRE_EXTINGUISHER", "KITCHEN", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73256,
      longitude: -104.97414,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 358,
      hostId: hostMap["139314021"],
    },
  });
  // 164. Comfy house 2 miles from downtown
  await prisma.listing.upsert({
    where: { slug: "comfy-house-2-miles-from-downtown-7948813" },
    update: {},
    create: {
      slug: "comfy-house-2-miles-from-downtown-7948813",
      title: "Comfy house 2 miles from downtown",
      description: "House has large kitchen, and great outdoor space with garden, grill, outdoor eating and lounge areas, pergola. Netflix / HBO / Hulu /Apple Tv+ Located 2 blocks from beautiful Sloan's Lake and 2 miles from downtown Denver. Walking distance to many restaurants on 32nd Ave and close to hip Tennyson district. Free street parking. Safe and quiet neighborhood. 2 miles from Empower field and Ball Arena.",
      propertyType: "APARTMENT",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzk0ODgxMw%3D%3D/original/f4ca05c2-2d48-46db-82bd-1c66d9ba0cda.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sloan Lake, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7561,
      longitude: -105.04096,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.87,
      totalReviews: 365,
      hostId: hostMap["41917396"],
    },
  });
  // 165. Sunny Private Guest Suite In Historic Denver Home
  await prisma.listing.upsert({
    where: { slug: "sunny-private-guest-suite-in-historic-denver-home-23905333" },
    update: {},
    create: {
      slug: "sunny-private-guest-suite-in-historic-denver-home-23905333",
      title: "Sunny Private Guest Suite In Historic Denver Home",
      description: "Get the real Denver experience - stay in our historic Washington Park home and enjoy all the unique perks the Mile High City has to offer. Our house is a 10 minute walk to the light rail, 2 minutes to the nearest bus stop, 2 minutes from I-25, and a $10 Lyft to pretty much anywhere in the Denver metro area. Quickly and easily get to downtown, the Tech Center, the shopping on South Broadway, to the mountains or simply relax in the comfort of our cozy guest suite.",
      propertyType: "CABIN",
      pricePerNight: 79.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/6c0d8e34-8699-416e-a704-92080443b63f.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "KITCHEN", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Washington Park West, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7056963685133,
      longitude: -104.98496787992562,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 359,
      hostId: hostMap["32593250"],
    },
  });
  // 166. The Stout House | Historic RiNo Carriage + Patio
  await prisma.listing.upsert({
    where: { slug: "the-stout-house-historic-rino-carriage-patio-45877458" },
    update: {},
    create: {
      slug: "the-stout-house-historic-rino-carriage-patio-45877458",
      title: "The Stout House | Historic RiNo Carriage + Patio",
      description: "The Stout House - Historic Curtis Park Carriage House Where Modern Comfort Meets Vintage Charm<br /><br />Experience authentic Denver living in this beautifully restored 1886 carriage house, perfectly positioned in the city's oldest and most vibrant neighborhood. The Stout House blends historic character with modern luxury in this intimate 2-bed/1-bath gem.",
      propertyType: "APARTMENT",
      pricePerNight: 234.0,
      cleaningFee: 35,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-45877458/original/6ee87a0a-a75d-406d-944e-52a60d639713.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76018,
      longitude: -104.9798,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.98,
      totalReviews: 356,
      hostId: hostMap["187875664"],
    },
  });
  // 167. Friendly Lic 04172
  await prisma.listing.upsert({
    where: { slug: "friendly-lic-04172-11037671" },
    update: {},
    create: {
      slug: "friendly-lic-04172-11037671",
      title: "Friendly Lic 04172",
      description: "My place has a recently updated bathroom and refinished wood floors. The kitchen is fully equipped with utensils to meet all your cooking needs. The cabinets and countertops are old but clean and functional. You'll appreciate that my place is within walking distance of many dispensaries, Sloan's Lake, restaurants, Joy Ride Brewery, bars, and dining options. There is plenty of free parking. No smoking cigarettes inside. Pot is legal in Colorado, so you may smell a faint odor of pot.",
      propertyType: "APARTMENT",
      pricePerNight: 91.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/e1a06dc8-10aa-4ba0-8525-c5cd136a4504.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "GYM", "CARBON_MONOXIDE_ALARM"],
      address: "Sloan Lake, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75716,
      longitude: -105.05302,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 367,
      hostId: hostMap["48954452"],
    },
  });
  // 168. Quaint Carriage House Near Downtown & Interstate
  await prisma.listing.upsert({
    where: { slug: "quaint-carriage-house-near-downtown-interstate-29130386" },
    update: {},
    create: {
      slug: "quaint-carriage-house-near-downtown-interstate-29130386",
      title: "Quaint Carriage House Near Downtown & Interstate",
      description: "Let our cozy & private carriage house be your home away from home, whether you're looking for a place to retreat for a getaway, a spot to get things done while traveling for work, or just somewhere to park your things and rest your head while you explore Denver.<br />The Clayton Carriage House provides the amenities you need to make you feel at home while offering you the ideal location and resources to let you get out there and discover all Denver has to offer from downtown to the mountains.",
      propertyType: "CABIN",
      pricePerNight: 107.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-29130386/original/9943762f-4119-459c-aea5-80229a8ddac3.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Clayton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76314,
      longitude: -104.95737,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 357,
      hostId: hostMap["219520656"],
    },
  });
  // 169. Designer Apartment in a Historic 1901 Downtown Area Mansion.
  await prisma.listing.upsert({
    where: { slug: "designer-apartment-in-a-historic-1901-downtown-area-mansion-15844892" },
    update: {},
    create: {
      slug: "designer-apartment-in-a-historic-1901-downtown-area-mansion-15844892",
      title: "Designer Apartment in a Historic 1901 Downtown Area Mansion.",
      description: "Fully remodeled, open-concept 1400 Sq/ft apartment in the heart of Denver in the highly-desirable/popular Cheesman Park area. The apartment is within a 20-minute walk of downtown Denver and just 2 blocks from the historic Cheesman Park and Denver Botanic Gardens. With a walkability score of Steps away are a variety of grocery stores, restaurants, coffee shops, and bars.<br /><br />Access to the entire unit with it's own private entrance in addition to our large backyard and off-street parking.",
      propertyType: "APARTMENT",
      pricePerNight: 86.0,
      cleaningFee: 13,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/992d9ef7-b368-4bf9-bc6b-d993694ccf03.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cheesman Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73257,
      longitude: -104.97233,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 363,
      hostId: hostMap["56267154"],
    },
  });
  // 170. Contemporary Berkeley 3 BED/3 BATH & Outdoor Patio
  await prisma.listing.upsert({
    where: { slug: "contemporary-berkeley-3-bed-3-bath-outdoor-patio-27985624" },
    update: {},
    create: {
      slug: "contemporary-berkeley-3-bed-3-bath-outdoor-patio-27985624",
      title: "Contemporary Berkeley 3 BED/3 BATH & Outdoor Patio",
      description: "This property is centrally located in Denver\u2019s charming Berkeley neighborhood where you\u2019ll find easy access to restaurants/bars, breweries, coffee, shopping and outdoor recreation. The unit features 3 bedrooms, 3 bathrooms, a fully equipped kitchen, living/dining area and outdoor patio. Easy access to DIA, downtown, Tennyson St., Highlands and all that Denver has to offer!",
      propertyType: "APARTMENT",
      pricePerNight: 208.0,
      cleaningFee: 31,
      serviceFee: 0,
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 3,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/e6a4bb8d-6f81-4658-8198-ded662560628.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77834,
      longitude: -105.02467,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 360,
      hostId: hostMap["107582791"],
    },
  });
  // 171. The Grand Curtis
  await prisma.listing.upsert({
    where: { slug: "the-grand-curtis-26130771" },
    update: {},
    create: {
      slug: "the-grand-curtis-26130771",
      title: "The Grand Curtis",
      description: "Step out of the usual boutique hotel routine and truly experience the liveliness of Denver. The Curtis Park Club has everything any wanderer needs to feel at home. Our mission is to provide every guest with the most memorable experience imaginable during their time in Denver. To help aid in creating those memories. The Grand Curtis is the Carriage House within a stone\u2019s throw from the Main House. Unlike the rooms located inside, the Grand Curtis is a fully equipped home, including a kitchen!",
      propertyType: "APARTMENT",
      pricePerNight: 90.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-26130771/original/1bd84389-630b-464f-93dc-0eab89a3a204.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75635,
      longitude: -104.98418,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.67,
      totalReviews: 373,
      hostId: hostMap["196418785"],
    },
  });
  // 172. Denver Getaway Studio in Contemporary Rustic Style
  await prisma.listing.upsert({
    where: { slug: "denver-getaway-studio-in-contemporary-rustic-style-31625086" },
    update: {},
    create: {
      slug: "denver-getaway-studio-in-contemporary-rustic-style-31625086",
      title: "Denver Getaway Studio in Contemporary Rustic Style",
      description: "Slide back the bedroom barn doors made from Beetle Kill Pine from the Rocky Mountains set beneath an original 1909 beam and start the day in the dual-head over-sized shower. After a BBQ dinner, sit by the fire pit under the twinkling string lights. This cozy basement studio has everything you need to explore all Denver has to offer!<br /><br />Get a great night's rest before heading out on your Colorado adventure! Cook meals in a fully-equipped kitchenette.<br />Utilize the spacious modern shower w/ dual shower heads. <br />Stay in to work, write that blog, cozy up to watch a movie, or read a book.<br /><br />Parking is next to garage in back of house. Entrance is through back gate and backyard.<br /><br />I am available as much or little as you would like to interact. I am happy to provide a local Denverite/Coloradan perspective and recommendations.<br /><br />Located across the street from the Regis University Campus, this neighborhood is quiet yet bustling. Take an easy 4-minute wal",
      propertyType: "CABIN",
      pricePerNight: 100.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/monet/Select-31625086/original/1d5069c0-c7ce-4b26-9fe1-25efd525269f", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "BBQ_GRILL", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Regis, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.78593,
      longitude: -105.03195,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.81,
      totalReviews: 362,
      hostId: hostMap["28939848"],
    },
  });
  // 173. Urban Retreat in Heart of Convention Center Dist
  await prisma.listing.upsert({
    where: { slug: "urban-retreat-in-heart-of-convention-center-dist-15143586" },
    update: {},
    create: {
      slug: "urban-retreat-in-heart-of-convention-center-dist-15143586",
      title: "Urban Retreat in Heart of Convention Center Dist",
      description: "This spacious two story, three bedroom/two full bath, loft style city home is located directly in the heart of downtown Denver's Theater-Convention Center District. Complete with an amazing city view, it's the perfect accommodation for both business & pleasure.",
      propertyType: "APARTMENT",
      pricePerNight: 191.0,
      cleaningFee: 29,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      beds: 4,
      images: ["https://a0.muscache.com/pictures/73228d67-d9cd-485c-9222-646b898ccbf9.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "HEATING", "AIR_CONDITIONING", "WIFI", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "CBD, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74511,
      longitude: -104.99288,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.84,
      totalReviews: 359,
      hostId: hostMap["96040278"],
    },
  });
  // 174. Denver Central Park / Stapleton Carriage House
  await prisma.listing.upsert({
    where: { slug: "denver-central-park-stapleton-carriage-house-13260989" },
    update: {},
    create: {
      slug: "denver-central-park-stapleton-carriage-house-13260989",
      title: "Denver Central Park / Stapleton Carriage House",
      description: "We're in Denver Central Park, Stapleton. 6 miles to downtown.  Walking distance to a pool, tennis courts, breweries, Stanley Marketplace, Starbucks, & local restaurants. <br /><br />Our place is ideal for couples, solo adventures & business travelers. <br /><br />Whether you're in town for business, visiting relatives in the neighborhood, or just touring Denver, this place is for you. <br /><br />We\u2019ll accommodate up to 4 people for guests with family members accompanying them.",
      propertyType: "CABIN",
      pricePerNight: 92.0,
      cleaningFee: 14,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/23fde92c-b4ca-4aa4-aac6-1a3ed6484253.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Stapleton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75762,
      longitude: -104.89356,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 349,
      hostId: hostMap["74646741"],
    },
  });
  // 175. Stylish modern room with rooftop hot tub
  await prisma.listing.upsert({
    where: { slug: "stylish-modern-room-with-rooftop-hot-tub-23060656" },
    update: {},
    create: {
      slug: "stylish-modern-room-with-rooftop-hot-tub-23060656",
      title: "Stylish modern room with rooftop hot tub",
      description: "Welcome to the Heart of the Santa Fe art district! <br /><br />Managed By: @TraverseHospitality",
      propertyType: "APARTMENT",
      pricePerNight: 75.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-23060656/original/4ced035c-1e4e-4503-bb2b-25c1c4a27e5e.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "BBQ_GRILL", "WIFI", "FIREPLACE", "SECURITY_CAMERAS", "TV", "AIR_CONDITIONING", "PARKING", "DRYER", "HOT_TUB", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Lincoln Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.730274,
      longitude: -105.000175,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.84,
      totalReviews: 357,
      hostId: hostMap["2461399"],
    },
  });
  // 176. Unbeatable Location - Spacious 1 Br 1.5 Ba Loft
  await prisma.listing.upsert({
    where: { slug: "unbeatable-location-spacious-1-br-1-5-ba-loft-26415492" },
    update: {},
    create: {
      slug: "unbeatable-location-spacious-1-br-1-5-ba-loft-26415492",
      title: "Unbeatable Location - Spacious 1 Br 1.5 Ba Loft",
      description: "Experience unmatched space, style, and comfort in this massive 1,200 sq. ft. downtown loft! With 15\u2019 ceilings, huge windows, and exposed brick, this gem features a remodeled kitchen, luxurious lofted bedroom with a king bed, blackout curtains, and a spa-like ensuite. The spacious living room boasts a huge leather sectional and an 86\u201d 4K TV, plus a pullout couch for extra guests. Steps from the Convention Center, dining, and more, this is downtown living at its finest\u2014just check the reviews!\u201d",
      propertyType: "APARTMENT",
      pricePerNight: 159.0,
      cleaningFee: 24,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-26415492/original/7e64c92e-4f0e-4059-ad27-010f8ab90787.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "HEATING", "AIR_CONDITIONING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "CBD, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74571,
      longitude: -104.99203,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 345,
      hostId: hostMap["9447036"],
    },
  });
  // 177. Cozy Victorian Townhome, Trendy Lohi Neighborhood.
  await prisma.listing.upsert({
    where: { slug: "cozy-victorian-townhome-trendy-lohi-neighborhood-25730584" },
    update: {},
    create: {
      slug: "cozy-victorian-townhome-trendy-lohi-neighborhood-25730584",
      title: "Cozy Victorian Townhome, Trendy Lohi Neighborhood.",
      description: "Get a taste of Victorian Denver in a living room with preserved brick walls, stained glass and tall windows allowing lots of light. Rooms have high ceilings in this townhouse and are tied together with restored hardwood floors and original millwork.<br /><br />City of Denver License # 2018-BFN-0004619<br /><br />High ceilings, exposed brick walls, decorative trim and other elements make this original Victorian townhome a rare gem in a newly redeveloped neighborhood. The home is split level with the living room, dining room and kitchen downstairs and the bedrooms, office and bathroom upstairs. (Please note, guests with children should take extra precautions with the hardwood stairs.) Lots of natural light pours in through large windows and a patio is available for lounging in the back. There\u2019s a 55\u201d television in the living room and a 42\u201d tv in the master bedroom. Granite counter tops and stainless appliances adorn the kitchen.<br /><br />Guests have access to all areas accept the outdo",
      propertyType: "APARTMENT",
      pricePerNight: 195.0,
      cleaningFee: 29,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 3,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/900d80f4-67c9-4878-a3f0-360d7e024b5e.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Highland, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76569,
      longitude: -105.01135,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 344,
      hostId: hostMap["42681856"],
    },
  });
  // 178. Modern Luxury in Converted Church (w/ Tiny House!)
  await prisma.listing.upsert({
    where: { slug: "modern-luxury-in-converted-church-w-tiny-house-8800911" },
    update: {},
    create: {
      slug: "modern-luxury-in-converted-church-w-tiny-house-8800911",
      title: "Modern Luxury in Converted Church (w/ Tiny House!)",
      description: "The Hellena is a newly converted 1930\u2019s church that offers modern luxury living in the heart of Denver. The space boasts two gorgeous master suites, a brand new kitchen with a 13ft. waterfall island, newly installed gas fireplace, and a light-filled choir loft. The Hellena also has a one-of-a-kind tiny house inside the space that includes another private bedroom and bathroom.",
      propertyType: "APARTMENT",
      pricePerNight: 448.0,
      cleaningFee: 67,
      serviceFee: 0,
      maxGuests: 12,
      bedrooms: 5,
      bathrooms: 4,
      beds: 7,
      images: ["https://a0.muscache.com/pictures/4bd1db8f-684a-4791-918b-b0537e98aff7.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "EV_CHARGER", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.72468,
      longitude: -104.98086,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 347,
      hostId: hostMap["228639"],
    },
  });
  // 179. Washington Park Carriage House,Garage EV charging
  await prisma.listing.upsert({
    where: { slug: "washington-park-carriage-house-garage-ev-charging-42095197" },
    update: {},
    create: {
      slug: "washington-park-carriage-house-garage-ev-charging-42095197",
      title: "Washington Park Carriage House,Garage EV charging",
      description: "The Carriage House is at the back of our property. First class accommodations, stainless steel appliances, granite counter tops, radiant heated bathroom floor. Your own private secure garage, Garage 18\u20196\u201d deep (not suitable for oversized vehicles) Level 2 EV charger (small fee applies) and a cozy 420 friendly patio. Convenient to premiere park, designer shops at Cherry Creek, business center, Ball parks, and entertainment district. All just a four-mile bike ride or a brief Uber.",
      propertyType: "CABIN",
      pricePerNight: 130.0,
      cleaningFee: 20,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/2c5a60dc-bc70-4f36-a87b-d46ad6eb1fdf.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "EV_CHARGER", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Washington Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.71265,
      longitude: -104.97272,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 340,
      hostId: hostMap["88175647"],
    },
  });
  // 180. Private Hot Tub & Fire Pit – Near Bear Creek Park
  await prisma.listing.upsert({
    where: { slug: "private-hot-tub-fire-pit-near-bear-creek-park-48195558" },
    update: {},
    create: {
      slug: "private-hot-tub-fire-pit-near-bear-creek-park-48195558",
      title: "Private Hot Tub & Fire Pit \u2013 Near Bear Creek Park",
      description: "This gorgeous downstairs guest suite has a private hot tub, fire pit, grill, and yard. Totally remodeled to offer you a beautiful, relaxing home. Spacious and fully equipped with a full kitchen and laundry. High-speed internet and many free streaming services. Free, easy street parking. Located in a quiet neighborhood 5 minutes from Bear Creek Park where you can enjoy charming trails beside the river. Minutes from restaurants, 20-25 mins from downtown or Red Rocks. Easy access to the mountains.",
      propertyType: "CABIN",
      pricePerNight: 162.0,
      cleaningFee: 24,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDgxOTU1NTg=/original/5b358550-7b37-495e-b1bc-c1bf2c06c648.jpeg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "GAME_ROOM", "BALCONY", "HEATING", "FIREPLACE", "WIFI", "BBQ_GRILL", "AIR_CONDITIONING", "TV", "PARKING", "DRYER", "HOT_TUB", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Harvey Park South, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.66003,
      longitude: -105.053,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.89,
      totalReviews: 344,
      hostId: hostMap["124761061"],
    },
  });
  // 181. NEW Design Guest House in Platt Park Neighborhood
  await prisma.listing.upsert({
    where: { slug: "new-design-guest-house-in-platt-park-neighborhood-46746974" },
    update: {},
    create: {
      slug: "new-design-guest-house-in-platt-park-neighborhood-46746974",
      title: "NEW Design Guest House in Platt Park Neighborhood",
      description: "Beautiful Design guest house in Platt Park - Built in 2020! Modern European finishes and luxurious details make this sleek ADU a stunner in Denver's Platt Park - One of the prettiest neighborhoods in town. <br /><br />Located 2 blocks from South Pearl St! Walk to Park Burger, Sweet Cow, Sushi Den, Tokyo Premier Bakery, Breweries, and the Farmers Market! Coffee Lovers enjoy Steam Espresso Bar, Corvus, Stella's + Nespresso.   <br /><br />Easy access to LightRail, I-25, University of Denver, Platt Park and Bike path",
      propertyType: "CABIN",
      pricePerNight: 138.0,
      cleaningFee: 21,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/airflow/Hosting-46746974/original/d1105c17-c3f1-4be0-8e33-556975ea38d6.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "GAME_ROOM", "BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68393,
      longitude: -104.98401,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 336,
      hostId: hostMap["11512929"],
    },
  });
  // 182. Spacious 1st flr private apt-central vibrant nbd!
  await prisma.listing.upsert({
    where: { slug: "spacious-1st-flr-private-apt-central-vibrant-nbd-31514726" },
    update: {},
    create: {
      slug: "spacious-1st-flr-private-apt-central-vibrant-nbd-31514726",
      title: "Spacious 1st flr private apt-central vibrant nbd!",
      description: "Spacious private 1st-floor apartment suite in an updated vintage Denver Square home - only 3 blocks to the Denver Botanic Gardens in the historic Congress Park Neighborhood of Denver. <br />A short Uber/Lyft ride (2.5 miles) to downtown Denver, & 1 block from the bus & bike shares.<br />Walking distance: Bookstore, Restaurants, coffee shops, Breakfast. Colfax Theater district is close.<br />Free on-street parking out front. The apartment has a living room, kitchenette, 1 bedroom w/attached bath & common area.",
      propertyType: "APARTMENT",
      pricePerNight: 111.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 5,
      bedrooms: 1,
      bathrooms: 2,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/8ee2f85b-9ac9-458b-8c4a-679eb5ccdb12.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73565,
      longitude: -104.95872,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.8,
      totalReviews: 348,
      hostId: hostMap["236142905"],
    },
  });
  // 183. Central Park Charm |Stylish Guest Suite in Denver
  await prisma.listing.upsert({
    where: { slug: "central-park-charm-stylish-guest-suite-in-denver-46694552" },
    update: {},
    create: {
      slug: "central-park-charm-stylish-guest-suite-in-denver-46694552",
      title: "Central Park Charm |Stylish Guest Suite in Denver",
      description: "Private 1 bedroom / 1 bath carriage house with private entrance, full kitchen with new stainless appliances, and everything you need to cook a great meal!  Full bath with walk-in closet, washer/dryer, and a spacious balcony in Central Park. Second-floor bedroom loft (*accessible with pull-down ladder*).  Safe, quiet neighborhood 15 minutes from downtown Denver, the RiNo district, and 20 minutes to the Highlands neighborhood.  Half a mile from the light rail station and 15 minutes to DIA Airport!",
      propertyType: "CABIN",
      pricePerNight: 83.0,
      cleaningFee: 12,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/f616f1d5-d53f-4e3b-8dd4-74a14ff94197.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Stapleton, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75585,
      longitude: -104.89497,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.94,
      totalReviews: 337,
      hostId: hostMap["15612930"],
    },
  });
  // 184. Stylish 2 story unit in Victorian Mansion
  await prisma.listing.upsert({
    where: { slug: "stylish-2-story-unit-in-victorian-mansion-10995273" },
    update: {},
    create: {
      slug: "stylish-2-story-unit-in-victorian-mansion-10995273",
      title: "Stylish 2 story unit in Victorian Mansion",
      description: "An 1886 Victorian brick mansion, updated with modern convenience and style. This unit spans two floors with a master suite upstairs, bath with jetted tub & skylighted shower. There's a second bedroom on the main level with full bath (also w/ jetted tub) just outside the bedroom. The sleeper sofa has a memory foam mattress. The TV has a Netflix subscription & other channels through a Roku. Wireless is screaming fast. There is a private deck through french doors with a skyline view.",
      propertyType: "APARTMENT",
      pricePerNight: 144.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/1897b29b-3612-4ef1-be1c-e81f4cf8de09.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "FIREPLACE", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76911,
      longitude: -104.96646,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 342,
      hostId: hostMap["6294270"],
    },
  });
  // 185. Historic Capitol Hill Mansion
  await prisma.listing.upsert({
    where: { slug: "historic-capitol-hill-mansion-4964614" },
    update: {},
    create: {
      slug: "historic-capitol-hill-mansion-4964614",
      title: "Historic Capitol Hill Mansion",
      description: "This private bedroom and bath is on the second floor of a historic mansion in Capitol Hill in Denver.  Located 2 blocks from the Molly Brown House, 4 blocks from the Denver Art Museum, 20 minute walk to downtown Denver. and the Convention Center.  The mansion is on the Historic Denver walking ghost tour. I am committed to a high level of cleaning for your comfort and safety.",
      propertyType: "APARTMENT",
      pricePerNight: 104.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/62198786/756680ca_original.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "FIREPLACE", "WIFI", "TV", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Capitol Hill, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73377,
      longitude: -104.9807,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 331,
      hostId: hostMap["25591329"],
    },
  });
  // 186. Biggest Mansion in denver downtown. 5069 feet
  await prisma.listing.upsert({
    where: { slug: "biggest-mansion-in-denver-downtown-5069-feet-24017637" },
    update: {},
    create: {
      slug: "biggest-mansion-in-denver-downtown-5069-feet-24017637",
      title: "Biggest Mansion in denver downtown. 5069 feet",
      description: "Gigantic Home, Very Clean and comfortable with recent remodel. HUGE 3 FLOORS  home. 16Sleeping rooms w/12 beds , 7 bedroomsLiving rooms, 3 Kitchens, Fire Pit outside. Entire Home is yours! <br /><br />0.2 miles to Mile High Stadium! Walkable!<br />0.2 miles to bars, restaurants and stores <br />0.5 miles to Sloan Lake Park <br /> 1.9 miles to Museum of Contemporary Art Denver<br /><br />9TVs - Fast Wifi<br /><br />Not your average home, Your group will LOVE it. Great group spaces with privacy when desired. Spectacular views!",
      propertyType: "APARTMENT",
      pricePerNight: 839.0,
      cleaningFee: 126,
      serviceFee: 0,
      maxGuests: 16,
      bedrooms: 7,
      bathrooms: 5,
      beds: 17,
      images: ["https://a0.muscache.com/pictures/hosting/Hosting-24017637/original/d3c745a3-7fb1-46bd-9dfc-ce92fd4bd551.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "HOT_TUB", "WASHER", "FIREPLACE", "PARKING", "DRYER", "KITCHEN", "TV", "CARBON_MONOXIDE_ALARM", "POOL", "BALCONY", "HEATING", "AIR_CONDITIONING", "BBQ_GRILL", "FIRST_AID_KIT", "SMOKE_ALARM"],
      address: "West Colfax, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.74548,
      longitude: -105.02818,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 337,
      hostId: hostMap["243192607"],
    },
  });
  // 187. Best Location. Rare 7 Room Privacy. Clean & Safe.
  await prisma.listing.upsert({
    where: { slug: "best-location-rare-7-room-privacy-clean-safe-27754700" },
    update: {},
    create: {
      slug: "best-location-rare-7-room-privacy-clean-safe-27754700",
      title: "Best Location. Rare 7 Room Privacy. Clean & Safe.",
      description: "The Best Private Rental in the Heart of Denver. Charming, Safe, Immaculate, Loaded with Amenities. Free Parking, Balcony, Walkability, Close to 2,500 Venues, Shops, Eateries, Clubs, adjacent to Cherry Creek Trail.<br /><br />Remodeled King Master w/Balcony. Workstations, 2 Big Screens, Full Kitchen, Laundry, Fast WiFi. Thick Towels & Quiet nights.<br /><br />Coffee & Tea: fresh cream, bottled water, condiments, many extras. <br /><br />2 Blocks: groceries, parks, dining & shopping.  1/2 mile: 500+ more. Enjoy where you are!",
      propertyType: "APARTMENT",
      pricePerNight: 164.0,
      cleaningFee: 25,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/f89b55a8-f276-4dca-aa6e-811781fe0b64.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["FIRE_EXTINGUISHER", "WORKSPACE", "GAME_ROOM", "WIFI", "WASHER", "FIREPLACE", "PET_FRIENDLY", "DRYER", "PARKING", "KITCHEN", "TV", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "BBQ_GRILL", "AIR_CONDITIONING", "FIRST_AID_KIT", "BABY_GEAR", "SMOKE_ALARM"],
      address: "Speer, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.721788162739486,
      longitude: -104.97394831447983,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.9,
      totalReviews: 334,
      hostId: hostMap["146196004"],
    },
  });
  // 188. Beautiful  Lower Level Sunnyside Guest Suite.
  await prisma.listing.upsert({
    where: { slug: "beautiful-lower-level-sunnyside-guest-suite-43248227" },
    update: {},
    create: {
      slug: "beautiful-lower-level-sunnyside-guest-suite-43248227",
      title: "Beautiful  Lower Level Sunnyside Guest Suite.",
      description: "Completely private entrance and space for you and your family/friends . We live on the main level and are always here to help with anything you need and answer questions  But always respect our guests privacy. <br /><br />We have been hosts for over five years and have continued to update our Airbnb's space indoor and outdoor for excellent stays and comfort for our guests .<br /><br />* Smoking is outdoors ONLY*.",
      propertyType: "APARTMENT",
      pricePerNight: 98.0,
      cleaningFee: 15,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/468e8093-9ae1-4900-b365-37994c25acd3.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "HEATING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Sunnyside, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77339,
      longitude: -105.01272,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 336,
      hostId: hostMap["72589855"],
    },
  });
  // 189. Urban Oasis in RiNo Arts District
  await prisma.listing.upsert({
    where: { slug: "urban-oasis-in-rino-arts-district-49158338" },
    update: {},
    create: {
      slug: "urban-oasis-in-rino-arts-district-49158338",
      title: "Urban Oasis in RiNo Arts District",
      description: "Our quaint 2 bedroom house was built in 1892. It is the perfect place to stay while exploring all the city has to offer. Were are in the heart of RiNo, which is one of the hippest spots in Denver. We are close to many bars and restaurants. You are just blocks away from Larimer street, which has a plethora of bars, restaurants and wall art for you to explore. If you are looking to get out of the city you're close to major highways so you can get away to the mountains easily.",
      propertyType: "APARTMENT",
      pricePerNight: 148.0,
      cleaningFee: 22,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-49158338/original/bb1b342c-7910-4b5e-94ce-57514e24ee44.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["POOL", "GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.7615,
      longitude: -104.97748,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 324,
      hostId: hostMap["40540817"],
    },
  });
  // 190. Captivating Cowgirl
  await prisma.listing.upsert({
    where: { slug: "captivating-cowgirl-26131284" },
    update: {},
    create: {
      slug: "captivating-cowgirl-26131284",
      title: "Captivating Cowgirl",
      description: "Step out of the usual boutique hotel routine and truly experience the liveliness of Denver. The Curtis Park Club has everything any wanderer needs to feel at home in the West. At The Curtis Park Club, our mission to provide every guest with the most memorable experience imaginable during their time in Denver. Let The Captivating Cowgirl lure you into your next adventure in the wild, wild West.",
      propertyType: "APARTMENT",
      pricePerNight: 108.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/prohost-api/Hosting-26131284/original/a0bcff69-0efc-4d73-89ba-edab8986a20f.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "FIREPLACE", "WIFI", "AIR_CONDITIONING", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Five Points, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75635339999999,
      longitude: -104.9841798,
      isActive: true,
      isFeatured: false,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.81,
      totalReviews: 336,
      hostId: hostMap["196418785"],
    },
  });
  // 191. Private Above Garage Carriage House King Bed
  await prisma.listing.upsert({
    where: { slug: "private-above-garage-carriage-house-king-bed-8671797" },
    update: {},
    create: {
      slug: "private-above-garage-carriage-house-king-bed-8671797",
      title: "Private Above Garage Carriage House King Bed",
      description: "1 bedroom modern carriage house with tons of privacy and comfort close to all the fun downtown Denver offerings. Use a separate entrance to come and go as you like!  Walking distance to coffee shops, delicious restaurants, and City Park.",
      propertyType: "CABIN",
      pricePerNight: 128.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/9ee7d807-010f-4fbb-a0e8-0351adb3ec88.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "WIFI", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.751,
      longitude: -104.96985,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.96,
      totalReviews: 324,
      hostId: hostMap["52470095"],
    },
  });
  // 192. Family Friendly Guest Suite | Walk to Wash Park!
  await prisma.listing.upsert({
    where: { slug: "family-friendly-guest-suite-walk-to-wash-park-45104125" },
    update: {},
    create: {
      slug: "family-friendly-guest-suite-walk-to-wash-park-45104125",
      title: "Family Friendly Guest Suite | Walk to Wash Park!",
      description: "Welcome to Wash Park! Our neighborhood is family-friendly and quiet with easy access to some of the best parts of Denver! The guest suite is newly renovated with luxurious features and spa-like bathrooms, in the garden level of our home. Essentially its own apartment (the owners, their toddler, and their hypoallergenic dog live upstairs full-time) with a keycode, private entrance. We have wifi, Rokus, pack-and-play, sound machine, and a kitchenette. Iconic Denver park just a block away!",
      propertyType: "CABIN",
      pricePerNight: 112.0,
      cleaningFee: 17,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 2,
      beds: 3,
      images: ["https://a0.muscache.com/pictures/56558304-738b-4ae0-9e06-87c748f0ebec.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Washington Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.70155,
      longitude: -104.96605,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.86,
      totalReviews: 328,
      hostId: hostMap["31676476"],
    },
  });
  // 193. Modern Carriage House Loft in Popular Platt Park
  await prisma.listing.upsert({
    where: { slug: "modern-carriage-house-loft-in-popular-platt-park-19848263" },
    update: {},
    create: {
      slug: "modern-carriage-house-loft-in-popular-platt-park-19848263",
      title: "Modern Carriage House Loft in Popular Platt Park",
      description: "No smoking on property and No 420.  Our modern carriage house is centered in a vibrant historic Denver neighborhood.  The interior is bright and airy with vaulted ceilings and huge windows. The house features a kitchen, living area and separate bedroom.<br /><br />There are many award winning nearby restaurants and breweries (even a couple distilleries) all in walking distance. The light rail station is a convenient 10 minute walk, the bus station is around the corner. Uber is available in minutes.",
      propertyType: "CABIN",
      pricePerNight: 73.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/d70d168e-16d4-4e9f-adf7-3dd67db3e49b.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Platt Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.68424,
      longitude: -104.9807,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 319,
      hostId: hostMap["45200960"],
    },
  });
  // 194. Private Hidden Gem in Berkeley Park - Free Parking
  await prisma.listing.upsert({
    where: { slug: "private-hidden-gem-in-berkeley-park-free-parking-40255025" },
    update: {},
    create: {
      slug: "private-hidden-gem-in-berkeley-park-free-parking-40255025",
      title: "Private Hidden Gem in Berkeley Park - Free Parking",
      description: "This spacious 628 sq ft mother-in-law suite is beautifully decorated to make your holiday extra special. One bedroom, one bathroom, living, dining room & generous kitchen space. Located in the gorgeous neighborhood of Berkeley Park. <br />Within walking distance to two lakes. 7 blocks away from the Tennyson St cafes & restaurants. <br />10min drive to Downtown & Union Station. 25min drive from the airport.<br /><br />More supplies then most. This place will make you want to buy all the furniture in it for you.",
      propertyType: "CABIN",
      pricePerNight: 118.0,
      cleaningFee: 18,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/2eb2accd-0cb0-44dc-be4b-91ac053bdb7a.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Berkeley, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77817,
      longitude: -105.03626,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.97,
      totalReviews: 319,
      hostId: hostMap["270246212"],
    },
  });
  // 195. Apartment in Denver  private & walkable to RiNo
  await prisma.listing.upsert({
    where: { slug: "apartment-in-denver-private-walkable-to-rino-24575590" },
    update: {},
    create: {
      slug: "apartment-in-denver-private-walkable-to-rino-24575590",
      title: "Apartment in Denver  private & walkable to RiNo",
      description: "Quietly  tucked away in the historic Whittier neighborhood. 5 blocks from the light rail with easy access to the Denver Airport, Downtown, City Park, Rino, Uptown,the Denver Zoo, and Denver Museum of Nature and Science. You can take the train from the airport & be 2 miles away.",
      propertyType: "APARTMENT",
      pricePerNight: 108.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/cad69691-37ca-42f7-8b36-1faae2597c33.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["GAME_ROOM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Whittier, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.75826,
      longitude: -104.96407,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.83,
      totalReviews: 328,
      hostId: hostMap["185692705"],
    },
  });
  // 196. Cozy Basement Suite near RiNo
  await prisma.listing.upsert({
    where: { slug: "cozy-basement-suite-near-rino-7584529" },
    update: {},
    create: {
      slug: "cozy-basement-suite-near-rino-7584529",
      title: "Cozy Basement Suite near RiNo",
      description: "Escape to a comfortable basement suite in our 1928 brick home. This urban oasis is centrally located in a residential neighborhood just northeast of downtown, near highways for traveling to the airport or mountains; and 5-10 minute driving distance from LoDo, RiNo, breweries, downtown, & other shopping, dining, & entertainment, City Park, Zoo, & Nature and Science museum. Private bathroom, free street parking, large back yard and shared deck for relaxing and dining (weather permitting).",
      propertyType: "APARTMENT",
      pricePerNight: 64.0,
      cleaningFee: 10,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/miso/Hosting-7584529/original/439fdec6-6d79-4e0e-88f5-5b39e3bb0ab6.jpeg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "FIRST_AID_KIT", "FIRE_EXTINGUISHER", "WORKSPACE", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76839,
      longitude: -104.96089,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.95,
      totalReviews: 320,
      hostId: hostMap["5887477"],
    },
  });
  // 197. NEW! Walker's Paradise Apartment in Congress Park
  await prisma.listing.upsert({
    where: { slug: "new-walker-s-paradise-apartment-in-congress-park-32032700" },
    update: {},
    create: {
      slug: "new-walker-s-paradise-apartment-in-congress-park-32032700",
      title: "NEW! Walker's Paradise Apartment in Congress Park",
      description: "Welcome to a newly remodeled apartment in Congress Park! This 2-bdrm, 1-bath unit is located in the window-filled basement level of a 3-story Denver Square house. The neighborhood is known for its friendly attitude, tree-lined streets, and proximity to Denver's best parks. With a walk score of 84 and a bike score of 94, this place is ideally located for getting around on foot & bike. Walk to Sprouts, Trader Joe's, coffee shops, movie theaters, ice cream parlors, local restaurants, and much more!",
      propertyType: "CABIN",
      pricePerNight: 106.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 6,
      bedrooms: 2,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/0fa58dc6-f0b8-4fcb-8383-851eb6ff5297.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "FIRE_EXTINGUISHER", "KITCHEN", "FIRST_AID_KIT", "WORKSPACE", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Congress Park, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.73480224609375,
      longitude: -104.94921875,
      isActive: true,
      isFeatured: false,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.78,
      totalReviews: 330,
      hostId: hostMap["2177476"],
    },
  });
  // 198. Clean quiet carriage house close to lightrail
  await prisma.listing.upsert({
    where: { slug: "clean-quiet-carriage-house-close-to-lightrail-31711950" },
    update: {},
    create: {
      slug: "clean-quiet-carriage-house-close-to-lightrail-31711950",
      title: "Clean quiet carriage house close to lightrail",
      description: "Come enjoy a sanctuary in the city. Our quiet, cozy carriage house is within walking distance of the light rail, RiNo art district, restaurants and dozens of craft breweries. High speed fiber optic internet provided.<br /><br />Located one mile from I-70, a trip to the mountains is within 30 minutes.<br /><br />The apartment is filled with natural light and all the comforts of home. With a queen bed in the bedroom and a queen memory foam mattress on the sofa bed, four adults can comfortably stay.",
      propertyType: "CABIN",
      pricePerNight: 125.0,
      cleaningFee: 19,
      serviceFee: 0,
      maxGuests: 4,
      bedrooms: 1,
      bathrooms: 1,
      beds: 2,
      images: ["https://a0.muscache.com/pictures/ca9ca3f9-97c9-4eb2-982e-8c3a842efaa3.jpg", "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80", "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80", "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"],
      amenities: ["GAME_ROOM", "HEATING", "WIFI", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "FIRST_AID_KIT", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Cole, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.76562,
      longitude: -104.97122,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 315,
      hostId: hostMap["26864804"],
    },
  });
  // 199. Denver/Berkeley private carriage house
  await prisma.listing.upsert({
    where: { slug: "denver-berkeley-private-carriage-house-36604444" },
    update: {},
    create: {
      slug: "denver-berkeley-private-carriage-house-36604444",
      title: "Denver/Berkeley private carriage house",
      description: "We are certain you'll love the carriage house.  Enjoy a  private, non-smoking, carriage house above our garage built in 2019.  2 TVs , WiFi, full kitchen, washer/dryer.  Bright and open, in Denver's trendy Berkeley/Tennyson neighborhood with restaurants and coffee shops 4 short blocks away.  Grocery store one block away and 10 minutes to downtown Denver. We are a \"no chores\" Airbnb. Leave the clean-up to us.  Host is on site in separate home ready to respond quickly to any questions.",
      propertyType: "APARTMENT",
      pricePerNight: 107.0,
      cleaningFee: 16,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/1d3f05cf-3b6e-482a-b8f6-206a82f4888d.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "TV", "PARKING", "DRYER", "BABY_GEAR", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "CARBON_MONOXIDE_ALARM"],
      address: "Berkeley, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.77088,
      longitude: -105.04889,
      isActive: true,
      isFeatured: true,
      instantBook: true,
      cancellationPolicy: "MODERATE",
      avgRating: 4.99,
      totalReviews: 315,
      hostId: hostMap["275147129"],
    },
  });
  // 200. Spacious Private Bdrm & Bath 15 min from DIA
  await prisma.listing.upsert({
    where: { slug: "spacious-private-bdrm-bath-15-min-from-dia-33704620" },
    update: {},
    create: {
      slug: "spacious-private-bdrm-bath-15-min-from-dia-33704620",
      title: "Spacious Private Bdrm & Bath 15 min from DIA",
      description: "Spacious bedroom on 2nd floor with private bathroom located in a new house in a new development.  The bedroom has a queen bed with dresser, nightstand and a closet. There is a new 50' smart TV  with basic cable and ready to watch Netflix (must use personal login) or any internet apps.  You will have full access to a brand new fully equipped kitchen and family room that is rarely used. Conveniently located approx. 15 minutes from the Denver Airport (DIA).",
      propertyType: "APARTMENT",
      pricePerNight: 72.0,
      cleaningFee: 11,
      serviceFee: 0,
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1,
      beds: 1,
      images: ["https://a0.muscache.com/pictures/a9cab2f8-7f89-4075-b8f2-4248517870bb.jpg", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"],
      amenities: ["OUTDOOR_DINING", "CARBON_MONOXIDE_ALARM", "BALCONY", "HEATING", "AIR_CONDITIONING", "WIFI", "SECURITY_CAMERAS", "PARKING", "DRYER", "FIRST_AID_KIT", "KITCHEN", "FIRE_EXTINGUISHER", "WASHER", "SMOKE_ALARM", "TV"],
      address: "Gateway - Green Valley Ranch, Denver, CO",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      zipCode: "80000",
      latitude: 39.79101,
      longitude: -104.77808,
      isActive: true,
      isFeatured: true,
      instantBook: false,
      cancellationPolicy: "MODERATE",
      avgRating: 4.91,
      totalReviews: 320,
      hostId: hostMap["12804331"],
    },
  });

  console.log("Done! Denver listings imported.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
