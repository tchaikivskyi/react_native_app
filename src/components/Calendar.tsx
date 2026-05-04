import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';

import { COLORS } from '../constants/style';
import { CustomButton } from './Button';

type Props = {
  from?: string | null;
  to?: string | null;
  onChange: (from: string | null, to: string | null) => void;
};

type ActiveInput = 'from' | 'to';

const markedBase = {
  color: COLORS.primary,
  textColor: '#FFFFFF',
};

const markedSingle = {
  ...markedBase,
  startingDay: true,
  endingDay: true,
};

export const DateRangePicker: React.FC<Props> = ({
  from = null,
  to = null,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<ActiveInput>('from');

  const openCalendar = (input: ActiveInput) => {
    setActiveInput(input);
    setVisible(true);
  };

  const isBefore = (a: string, b: string) =>
    new Date(a).getTime() < new Date(b).getTime();

  const addOneDay = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() + 1);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    return `${y}-${m}-${d}`;
  };

  const getMarkedDates = () => {
    const marked: Record<string, any> = {};

    if (!from) return marked;

    if (!to) {
      marked[from] = markedSingle;
      return marked;
    }

    for (let date = from; !isBefore(to, date); date = addOneDay(date)) {
      marked[date] = markedBase;
    }

    marked[from] = {
      ...marked[from],
      startingDay: true,
    };

    marked[to] = {
      ...marked[to],
      endingDay: true,
    };

    return marked;
  };

  const handleSelectDate = ({ dateString }: DateData) => {
    if (activeInput === 'from') {
      onChange(dateString, to && isBefore(to, dateString) ? null : to);
      setVisible(false);
      return;
    }

    if (!from || isBefore(dateString, from)) {
      onChange(dateString, null);
      setVisible(false);
      return;
    }

    onChange(from, dateString);
    setVisible(false);
  };

  const clearDates = () => {
    onChange(null, null);
    setVisible(false);
  };

  return (
    <View>
      <View style={styles.inputsRow}>
        <DateBox
          label="From"
          value={from}
          onPress={() => openCalendar('from')}
        />

        <DateBox label="To" value={to} onPress={() => openCalendar('to')} />
      </View>

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {activeInput === 'from' ? 'from' : 'to'} date
              </Text>

              <TouchableOpacity onPress={() => setVisible(false)}>
                <Text style={styles.close}>✕</Text>
              </TouchableOpacity>
            </View>

            <Calendar
              markingType="period"
              markedDates={getMarkedDates()}
              onDayPress={handleSelectDate}
              enableSwipeMonths
              minDate={new Date().toISOString().split('T')[0]}
              renderArrow={direction => (
                <Text style={styles.arrow}>
                  {direction === 'left' ? '‹' : '›'}
                </Text>
              )}
              theme={{
                todayTextColor: COLORS.primary,
                arrowColor: COLORS.primary,
              }}
            />

            <CustomButton
              title="Clear dates"
              variant="outline"
              onPress={clearDates}
              style={styles.clearButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

type DateBoxProps = {
  label: string;
  value?: string | null;
  onPress: () => void;
};

const DateBox: React.FC<DateBoxProps> = ({ label, value, onPress }) => (
  <TouchableOpacity
    style={styles.dateInput}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={styles.inputLabel}>{label}</Text>
    <Text style={[styles.inputValue, !value && styles.placeholder]}>
      {value || 'Select date'}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputLabel: {
    fontSize: 12,
    color: '#8A8A8A',
    marginBottom: 4,
  },
  inputValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },
  placeholder: {
    color: '#A0A0A0',
    fontWeight: '400',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 18,
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 14,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },
  close: {
    fontSize: 22,
    color: '#555555',
    padding: 6,
  },
  arrow: {
    fontSize: 22,
    color: COLORS.primary,
  },
  clearButton: {
    marginTop: 10,
    borderWidth: 1,
  },
});
