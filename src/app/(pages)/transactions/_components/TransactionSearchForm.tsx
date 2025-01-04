'use client'

import useTransactionsStore from "@/lib/stores/TransactionStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, TextField, Button } from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

//define search form type
export type TransactionSearchFormInput = {
    account: string | null,
    startDate: Date | null,
    endDate: Date | null
}

export default function TransactionSearchForm() {

    

    const {searchCriteria, setSearchCriteria, pageCriteria} = useTransactionsStore()
    

    // define search form schema validations
    const transactionSearchFormSchema = z.object({
        account: z.string({
            required_error: 'Account is required'
        })
            .nonempty('Account is required'),
        startDate: z.date({
            required_error: 'Start Date is required',
            invalid_type_error: 'Start Date is required',
        }).refine((date) => date instanceof Date && !isNaN(date.getTime()), 'Invalid date'),
        endDate: z.date({
            required_error: 'End Date is required',
            invalid_type_error: 'End Date is required'
        })
    })


    //Create and register form
    const { register,
            handleSubmit,
            watch,
            control,
            setValue,
            clearErrors,
            setError,
            trigger,
            getFieldState,
            formState: { errors, isValid, touchedFields } }
            = useForm<TransactionSearchFormInput>({
                resolver: zodResolver(transactionSearchFormSchema),
                mode: 'all',
            })

    //add wather to start date and update end date accordingly
    const watchStartDate = watch('startDate')
    
    useEffect(() => {
        if (watchStartDate) {
            const endDate = new Date(watchStartDate.getFullYear(), watchStartDate.getMonth() + 1, 0);
            setValue('endDate', endDate, { shouldValidate: true })
        }

    }, [watchStartDate])


    //handle form submission
    const onSubmit: SubmitHandler<TransactionSearchFormInput> = (data) => {
       // console.log(data)
        console.log(pageCriteria)
        setSearchCriteria(data)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Box component='form'
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    '& > :not(style)': { m: 1, width: '25ch' }
                }}>

                <Controller
                    name="account"
                    control={control}
                    defaultValue={''}
                    render={({
                        fieldState,
                        formState,
                        field
                    }) => (
                        <TextField {...field}
                            required
                            helperText={errors.account && touchedFields.account ? errors.account.message : null}
                            error={!!errors.account && touchedFields.account}
                            size="small"
                            variant="outlined"
                            label='Account'
                        />
                    )}>

                </Controller>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        render={({
                            field
                        }) => (
                            <DatePicker
                                {...field}
                                value={field.value || null} // Ensure null is handled
                                onChange={(value) => {
                                    if (value) {
                                        clearErrors('startDate'); // Clear error when a valid date is selected
                                        field.onChange(value); // Update field value
                                    } else {
                                        setError('startDate', { message: 'Date is required' }); // Set error when cleared
                                        field.onChange(null); // Update field value to null
                                    }
                                }}
                                onClose={() => {
                                    // Mark the field as touched when the picker is closed
                                    if (!field.value) {
                                        setError('startDate', { message: 'Date is required' });
                                    }
                                }}
                                slots={{
                                    textField: TextField
                                }}
                                slotProps={{
                                    textField: {
                                        label: 'Start Date',
                                        variant: 'outlined',
                                        size: 'small',
                                        required: true,
                                        error: getFieldState('startDate').invalid,
                                        helperText: errors.startDate ? errors.startDate.message : null,
                                        onBlur: () => {
                                            trigger('startDate')
                                        }
                                    }
                                }}
                            />
                        )
                        }
                    />

                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        render={({
                            field
                        }) => (
                            <DatePicker
                                {...field}
                                value={field.value || null} // Ensure null is handled
                                onChange={(value) => {
                                    if (value) {
                                        clearErrors('endDate'); // Clear error when a valid date is selected
                                        field.onChange(value); // Update field value
                                    } else {
                                        setError('endDate', { message: 'Date is required' }); // Set error when cleared
                                        field.onChange(null); // Update field value to null
                                    }
                                }}
                                onClose={() => {
                                    // Mark the field as touched when the picker is closed
                                    if (!field.value) {
                                        setError('endDate', { message: 'Date is required' });
                                    }
                                }}
                                slots={{
                                    textField: TextField
                                }}
                                slotProps={{
                                    textField: {
                                        label: 'End Date',
                                        variant: 'outlined',
                                        size: 'small',
                                        required: true,
                                        error: !!errors.endDate,
                                        helperText: errors.endDate ? errors.endDate.message : null,
                                        onBlur: () => {
                                            trigger('endDate')
                                        }
                                    }
                                }}
                            />
                        )
                        }
                    />

                </LocalizationProvider>

                <Button sx={{ maxHeight: '40px' }} size="small" type="submit" variant="contained" disabled={!isValid}>Search</Button>


            </Box>
        </div>
    )
}