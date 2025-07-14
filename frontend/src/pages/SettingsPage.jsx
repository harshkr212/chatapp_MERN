
import useThemeStore from "../store/useThemeStore"
import Themes from '../constant/index.js'

const Preview_message = [{ id: "1", message: "Hey! How's it going ", isSent: false }, { id: "2", message: "I am doing great! Just working on some new features.", isSent: true }]

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/700">Choose a theme for your chat interface</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8">
          {Themes.map((t) => (

            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200" : "bg-base-200/50"}`}
              onClick={()=>{setTheme(t)}}>
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="bg-primary rounded"></div>
                  <div className="bg-secondary rounded"></div>
                  <div className="bg-accent rounded"></div>
                  <div className="bg-neutral rounded"></div>
                </div>

              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0) + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default SettingsPage
