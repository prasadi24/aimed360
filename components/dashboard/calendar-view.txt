"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format, isToday } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export type CalendarEvent = {
    id: string
    title: string
    date: Date
    time?: string
    type?: string
    status?: "scheduled" | "completed" | "cancelled"
}

interface CalendarViewProps {
    events: CalendarEvent[]
    title?: string
    onEventClick?: (event: CalendarEvent) => void
}

export function CalendarView({ events, title = "Calendar", onEventClick }: CalendarViewProps) {
    const [date, setDate] = React.useState<Date>(new Date())
    const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(new Date())

    // Filter events for the selected day
    const selectedDayEvents = React.useMemo(() => {
        if (!selectedDay) return []
        return events.filter(
            (event) =>
                event.date.getDate() === selectedDay.getDate() &&
                event.date.getMonth() === selectedDay.getMonth() &&
                event.date.getFullYear() === selectedDay.getFullYear(),
        )
    }, [selectedDay, events])

    // Get days with events for highlighting in the calendar
    const daysWithEvents = React.useMemo(() => {
        return events.map((event) => new Date(event.date))
    }, [events])

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                    <div className="p-4 border-b md:border-b-0 md:border-r">
                        <DayPicker
                            mode="single"
                            selected={selectedDay}
                            onSelect={setSelectedDay}
                            month={date}
                            onMonthChange={setDate}
                            modifiers={{
                                hasEvent: daysWithEvents,
                                today: [new Date()],
                            }}
                            modifiersStyles={{
                                hasEvent: {
                                    fontWeight: "bold",
                                    textDecoration: "underline",
                                    textUnderlineOffset: "4px",
                                    textDecorationColor: "var(--primary)",
                                    textDecorationThickness: "2px",
                                },
                                today: {
                                    fontWeight: "bold",
                                    color: "var(--primary)",
                                },
                            }}
                            components={{
                                IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                                IconRight: () => <ChevronRight className="h-4 w-4" />,
                            }}
                            className="border-collapse border-transparent"
                        />
                    </div>
                    <div className="p-4 flex-1">
                        <h3 className="font-medium text-sm mb-4">
                            {selectedDay ? format(selectedDay, "MMMM d, yyyy") : "No date selected"}
                            {isToday(selectedDay || new Date()) && " (Today)"}
                        </h3>
                        {selectedDayEvents.length > 0 ? (
                            <div className="space-y-3">
                                {selectedDayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={cn(
                                            "p-3 rounded-md cursor-pointer hover:bg-muted/50 transition-colors",
                                            event.status === "cancelled" && "opacity-60",
                                        )}
                                        onClick={() => onEventClick?.(event)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium">{event.title}</p>
                                                {event.time && <p className="text-sm text-muted-foreground">{event.time}</p>}
                                            </div>
                                            {event.type && (
                                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{event.type}</span>
                                            )}
                                        </div>
                                        {event.status && (
                                            <div className="mt-2">
                                                <span
                                                    className={cn(
                                                        "text-xs px-2 py-1 rounded-full",
                                                        event.status === "scheduled" && "bg-blue-100 text-blue-800",
                                                        event.status === "completed" && "bg-green-100 text-green-800",
                                                        event.status === "cancelled" && "bg-red-100 text-red-800",
                                                    )}
                                                >
                                                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-40 text-center">
                                <p className="text-muted-foreground mb-2">No events scheduled for this day</p>
                                <Button variant="outline" size="sm">
                                    Add Event
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
