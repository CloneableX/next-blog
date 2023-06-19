import Image from "next/image";

export const ProfilePic = () => {
  return (
    <section className="w-full mx-auto">
      <Image
        src="/images/profile-pic-460x460.jpeg"
        alt="Cloneable's Profile Pic"
        width={200}
        height={200}
        priority={true}
        className="border-4 border-black drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
      />
    </section>
  )
}