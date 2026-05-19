import { OnboardingWizard } from "@/components/dashboard/onboarding-wizard"

export default function OnboardingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Onboarding</h1>
        <p className="text-muted-foreground">
          Configurez votre compte en quelques étapes simples.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  )
}
