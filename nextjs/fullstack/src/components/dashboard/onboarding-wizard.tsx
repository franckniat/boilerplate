"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "motion/react"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  featureHighlights,
  gettingStartedChecklist,
  ONBOARDING_STORAGE_KEY,
  onboardingSteps,
} from "@/lib/mock-data/onboarding"

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [checklist, setChecklist] = useState(gettingStartedChecklist)

  useEffect(() => {
    try {
      const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (completed === "true") {
        setIsCompleted(true)
      }
    } catch {
      // Ignore storage errors
    }
  }, [])

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const step = onboardingSteps[currentStep]

  const markCompleted = useCallback(() => {
    try {
      localStorage.setItem(ONBOARDING_STORAGE_KEY, "true")
    } catch {
      // Ignore storage errors
    }
    setIsCompleted(true)
  }, [])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      markCompleted()
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const handleSkip = () => {
    markCompleted()
  }

  if (isCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Onboarding terminé</CardTitle>
          <CardDescription>
            Vous avez déjà complété l&apos;introduction. Retournez au tableau
            de bord pour continuer.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/dashboard">Aller au tableau de bord</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              try {
                localStorage.removeItem(ONBOARDING_STORAGE_KEY)
              } catch {
                // Ignore
              }
              setIsCompleted(false)
              setCurrentStep(0)
            }}
          >
            Recommencer
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Étape {currentStep + 1} sur {onboardingSteps.length}
          </span>
          <Button variant="ghost" size="sm" onClick={handleSkip}>
            Passer
          </Button>
        </div>
        <Progress value={progress} />
      </div>

      <div className="flex flex-wrap gap-2">
        {onboardingSteps.map((s, index) => (
          <Button
            key={s.id}
            variant={index === currentStep ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentStep(index)}
          >
            {index < currentStep && <Check className="size-3" data-icon />}
            {s.title}
          </Button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{step.title}</CardTitle>
          <CardDescription>{step.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
          {step.id === "welcome" && (
            <p className="text-sm text-muted-foreground">
              Bienvenue sur ACME ! Cette plateforme vous permet de gérer vos
              utilisateurs, suivre vos métriques SaaS et configurer votre
              espace de travail en quelques minutes.
            </p>
          )}

          {step.id === "profile" && (
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="onboarding-name">Nom complet</FieldLabel>
                <Input id="onboarding-name" placeholder="Votre nom" />
              </Field>
              <Field>
                <FieldLabel htmlFor="onboarding-email">Email</FieldLabel>
                <Input
                  id="onboarding-email"
                  type="email"
                  placeholder="vous@example.com"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="onboarding-username">
                  Nom d&apos;utilisateur
                </FieldLabel>
                <Input
                  id="onboarding-username"
                  placeholder="nom_utilisateur"
                />
              </Field>
            </FieldGroup>
          )}

          {step.id === "features" && (
            <div className="grid gap-4 sm:grid-cols-3">
              {featureHighlights.map((feature) => (
                <Card key={feature.title}>
                  <CardHeader>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          {step.id === "checklist" && (
            <div className="flex flex-col gap-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <Checkbox
                    checked={item.done}
                    onCheckedChange={(checked) =>
                      setChecklist((prev) =>
                        prev.map((c) =>
                          c.id === item.id
                            ? { ...c, done: checked === true }
                            : c
                        )
                      )
                    }
                  />
                  <span className="text-sm">{item.label}</span>
                </label>
              ))}
            </div>
          )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardFooter className="flex justify-between border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft data-icon />
            Précédent
          </Button>
          <Button onClick={handleNext}>
            {currentStep === onboardingSteps.length - 1 ? (
              "Terminer"
            ) : (
              <>
                Suivant
                <ChevronRight data-icon />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
