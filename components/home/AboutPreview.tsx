import Button from '@/components/Button'

const highlights = [
  { icon: '✈️', title: 'נסיעות מותאמות אישית', text: 'תכנון מסלול שמתאים בדיוק לכם' },
  { icon: '🎁', title: 'הטבות בלעדיות', text: 'הנחות ושיתופי פעולה עם עסקים נבחרים' },
  { icon: '🤝', title: 'קהילה תומכת', text: 'חברים שכבר גילו את ברלין לפניכם' },
  { icon: '📍', title: 'המלצות מקומיות', text: 'המקומות שרק מי שגר כאן מכיר' },
]

export default function AboutPreview() {
  return (
    <section className="py-16 px-4 bg-cream-100 dark:bg-navy-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-navy-700 dark:text-cream-50 mb-6">
              אודות Liga Deals Berlin
            </h2>
            <p className="text-navy-500 dark:text-cream-200 mb-4 text-lg leading-relaxed">
              אנחנו מועדון ההטבות המוביל בברלין, המספק לחברים שלנו גישה להטבות בלעדיות, מאמרים מעניינים,
              המלצות אישיות וכל המידע שצריך כדי ליהנות מהחיים בברלין.
            </p>
            <p className="text-navy-500 dark:text-cream-200 mb-6 text-lg leading-relaxed">
              הצטרפו אלינו וקבלו גישה למגוון רחב של הטבות בעסקים מובילים בברלין, תכנים ייחודיים וקהילה תומכת.
            </p>
            <Button href="/about" variant="navy">
              למד עוד עלינו
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white dark:bg-navy-700 p-6 shadow-sm ring-1 ring-navy-100 dark:ring-navy-600"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-2xl dark:bg-navy-600">
                  {item.icon}
                </div>
                <h3 className="mb-1 font-bold text-navy-700 dark:text-cream-50">{item.title}</h3>
                <p className="text-sm text-navy-400 dark:text-cream-200">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
