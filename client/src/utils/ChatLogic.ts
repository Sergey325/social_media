import {differenceInCalendarDays, differenceInCalendarYears, format} from "date-fns";
import {Message} from "../../types";

export const isLastMessage = (messages: Message[], index: number) => {
    if(!messages) return false
    if(index === messages.length - 1){
        return true
    }
    if(messages[index + 1].sender._id !== messages[index].sender._id){
        return true
    }
    return false
}

export const formatDateTime = (dateTime: Date) => {
    const date = new Date(dateTime);
    const now = new Date();
    const yearDifference = differenceInCalendarYears(now, date);

    if (yearDifference < 1) {
        return format(date, 'MMMM d');
    } else {
        return format(date, 'dd.MM.yyyy');
    }
}

export const isNextDayMessage = (previousMessageDate: Date, currentMessageDate?: Date) => {
    if (!currentMessageDate){
        return differenceInCalendarDays(new Date(previousMessageDate),  Date.now()) !== 0
    }
    return differenceInCalendarDays(new Date(previousMessageDate),  new Date(currentMessageDate)) !== 0
}