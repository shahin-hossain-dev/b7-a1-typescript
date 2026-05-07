## কেন TypeScript এ অচেনা টইপের ডাটা গুলোকে `unknown` টাইপ ব্যবহার করতে হবে এবং type narrowing বলতে কি বুঝায়?

**TypeScript-এ সবচেয়ে ভুল বোঝা দুটো জিনিস:** `any` type এবং **type narrowing**।

### আমরা সবাই `any` দিয়ে শুরু করেছি

TypeScript শেখার পর `any` দেখে আমাদের মনে হয়েছিল — খুব সহজ সমাধান।  
“এখন সময় নেই, পরে ঠিক করে নিব” বলে আমরা সহজেই `any` লিখে দিতাম।

**কিন্তু সত্যি কথা হলো**, `any` আসলে TypeScript-এর একটা বড় দুর্বলতা। এটা আমাদের কোডের মধ্যে একটা ফাঁকা দরজা খুলে রাখে, যেখান দিয়ে যেকোনো bug ঢুকে পড়তে পারে।

### `any` আসলে কী করে?

`any` লিখলেই আমরা TypeScript-কে বলি:

> “এটাকে চেক করো না। আমরা জানি কী করছি।”

TypeScript চুপ করে যায় এবং সেই variable-এর সব type checking বন্ধ করে দেয়। যেমন:

```ts
let data: any = "hello";
data.toUpperCase(); // এটা সাধারণত কাজ করবে

data = 42;
data.toUpperCase(); // Runtime এ crash. কিন্তু TS কিছুই বলল না!
```

**সমস্যা:** TypeScript আমাদের অন্ধভাবে বিশ্বাস করে। Production-এ গিয়ে ব্যবহারকারীর কাছে অ্যাপ ক্র্যাশ করে।

### আসল বিপদ

একটা `any` শুধু একটা ভেরিয়েবল নষ্ট করে না। আমরা যদি `any` কোনো ফাংশনে পাঠাই, তাহলে পুরো ফাংশনের type safety নষ্ট হয়ে যায়। ফাঁকটা ছড়িয়ে পড়ে।

<br>
<br>

## `unknown` — আমাদের নিরাপদ বিকল্প

TypeScript 3.0 থেকে `unknown` এসেছে `any`-এর সৎ সংস্করণ হিসেবে।

এর মূল কথা হলো
`unknown` বলে — “আমি এখনো জানি না এটা কী, আর না জেনে ব্যবহার করব না।”

### `any` vs `unknown`

| বৈশিষ্ট্য            | `any`                    | `unknown`                     |
| -------------------- | ------------------------ | ----------------------------- |
| TypeScript চেক করে?  | না (সব বিশ্বাস করে)      | হ্যাঁ (verify করতে বাধ্য করে) |
| Bug কোথায় ধরা পড়ে? | Runtime-এ (production-এ) | Compile time-এ                |
| নিরাপত্তা            | খুবই বিপজ্জনক            | নিরাপদ                        |

**উদাহরণ:**

```ts
let data: unknown = "hello";

// সরাসরি ব্যবহার করা যাবে না
// data.toUpperCase();

// আগে চেক করতে হবে
if (typeof data === "string") {
  console.log(data.toUpperCase()); // এখন নিরাপদ
}
```

<br>
<br>

## Type Narrowing কী?

**Type Narrowing** হলো অস্পষ্ট বড় টাইপ থেকে নির্দিষ্ট টাইপে আসার প্রক্রিয়া। এতে TypeScript আমাদেরকে নিরাপদভাবে কোড লিখতে দেয়।

গোয়েন্দার মতো ভাবুন:

- শুরুতে জানি: `"কিছু একটা এসেছে"` → `unknown`
- প্রমাণ দেখে সংকুচিত করি → `"এটা string"`

### আমরা যেভাবে Narrowing করি

1. **`typeof` চেক**
2. **`instanceof` চেক**
3. **`in` অপারেটর**
4. **Custom Type Guard**

### পুরো উদাহরণ

```ts
function processInput(input: unknown) {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
    return;
  }

  if (typeof input === "number") {
    console.log(input.toFixed(2));
    return;
  }

  if (input instanceof Date) {
    console.log(input.toISOString());
    return;
  }

  console.log("unknown input");
}
```

<br>
<br>

## আমরা কখন `unknown` ব্যবহার করব?

- API response নেয়ার সময়
- User input parsing-এ
- `catch (err: unknown)` ব্লকে
- যেকোনো external data-এর ক্ষেত্রে যেখানে আমাদের পুরো নিয়ন্ত্রণ নেই

```ts
// সবচেয়ে ভালো প্র্যাকটিস
try {
  // ...
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("Unknown error occurred");
  }
}
```

<br>
<br>

## সংক্ষেপে উপসংহার হলো

- `any` TypeScript বন্ধ করে। Bug লুকিয়ে থাকে।
- `unknown` TypeScript চালু রাখে। Bug আগেই ধরা পড়ে।
- Narrowing `any` থেকে `unknown`-এ যাওয়ার সেতু এবং টাইপকে বিভিন্ন keyword ব্যবহার করে কনডিশনের মাধ্যমে চেক করে নিরাপদ করে।

অতএব, `unknown` ব্যবহার করতে হবে, `any` এড়িয়ে চলতে হবে।
