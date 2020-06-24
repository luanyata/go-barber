import React, { FunctionComponent, useState, useCallback, useEffect, useMemo } from 'react'
import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles'

import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import logoImg from '../../assets/logo.svg'
import { FiPower, FiClock } from 'react-icons/fi'
import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

interface MonthAvailabilityItem {
  day: number,
  available: boolean
}

const Dashboard: FunctionComponent = () => {

  const [selectedDate, setselectedDate] = useState(new Date())
  const [currentMonth, setcurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

  const { signOut, user } = useAuth();


  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setselectedDate(day)
    }
  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setcurrentMonth(month)
  }, []);

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


  return (
    (
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt="GoBarber" />

            <Profile>
              <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4"
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
              <span>Hoje</span>
              <span>Dia 06</span>
              <span>Segunda-feira</span>
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
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4" alt="Luan Lima" />
                  <strong>Luan Lima</strong>
                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4" alt="Luan Lima" />
                  <strong>Luan Lima</strong>
                </div>
              </Appointment>
            </Section>
            <Section>
              <strong>Tarde</strong>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4" alt="Luan Lima" />
                  <strong>Luan Lima</strong>
                </div>
              </Appointment>
              <Appointment>
                <span>
                  <FiClock />
                  08:00
                </span>

                <div>
                  <img src="https://avatars2.githubusercontent.com/u/5342280?s=460&u=0da4ef3c176d35a0609cbde11c28dae710da340e&v=4" alt="Luan Lima" />
                  <strong>Luan Lima</strong>
                </div>
              </Appointment>
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
