import React, { FunctionComponent, useState, useCallback, useEffect, useMemo } from 'react'
import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles'

import { isToday, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'
import { parseISO } from 'date-fns/esm'

interface MonthAvailabilityItem {
  day: number,
  available: boolean
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatarUrl: string;
  }
}

const Dashboard: FunctionComponent = () => {

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

  const { signOut, user } = useAuth();

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id])

  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate()
      }
    }).then(response => {
      const appointmentsFormatted = response.data.map(appointment => {
        return {
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }
      })
      setAppointments(appointmentsFormatted)
    })
  }, [selectedDate])


  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, []);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR
    })
  }, [selectedDate])

  const disabledDay = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day)
      })

    return dates;
  }, [currentMonth, monthAvailability])

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR })
  }, [selectedDate])

  const morningAppoitments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12
    })
  }, [appointments])

  const afternoonAppoitments = useMemo(() => {
    return appointments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12
    })
  }, [appointments])

  return (
    (
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="GoBarber" />

            <Profile>
              <img src={user.avatarUrl}
                alt={user.name} />
              <div>
                <span>Bem-vindo,</span>
                <strong>{user.name}</strong>
              </div>
            </Profile>
            <button type="button" onClick={signOut}>
              <FiPower />
            </button>
          </HeaderContent>
        </Header>
        <Content>
          <Schedule>

            <h1>Horários Agendados</h1>
            <p>
              {isToday(selectedDate) && <span>Hoje</span>}
              <span>{selectedDateAsText}</span>
              <span>{selectedWeekDay}</span>
            </p>

            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4" alt="Luan Lima" />
                <strong>Luan Lima</strong>
                <span>
                  <FiClock />
                  08:00
                </span>
              </div>
            </NextAppointment>

            <Section>
              <strong>Manhã</strong>
              {morningAppoitments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}

                  </span>
                  <div>
                    <img src={appointment.user.avatarUrl} alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>

              ))}
            </Section>
            <Section>
              <strong>Tarde</strong>

              {afternoonAppoitments.map(appointment => (
                <Appointment key={appointment.id}>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                  <div>
                    <img src={appointment.user.avatarUrl} alt={appointment.user.name} />
                    <strong>{appointment.user.name}</strong>
                  </div>
                </Appointment>
              ))}
            </Section>
          </Schedule>
          <Calendar >

            <DayPicker weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()}
              disabledDays={[
                { daysOfWeek: [0] }, ...disabledDay
              ]}
              modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5, 6] } }}
              onDayClick={handleDateChange}
              selectedDays={selectedDate}
              onMonthChange={handleMonthChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro'
              ]} />
          </Calendar>
        </Content>

      </Container>
    )
  )
}

export default Dashboard;
