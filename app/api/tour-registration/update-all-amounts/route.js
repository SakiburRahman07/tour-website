import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request) {
  try {
    const { totalAmount } = await request.json();
    
    if (!totalAmount || isNaN(parseFloat(totalAmount)) || parseFloat(totalAmount) <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Log the operation for debugging
    console.log(`Updating all registrations to total amount: ${totalAmount}`);
    
    // Get all registrations first
    const registrations = await prisma.tourRegistration.findMany();
    console.log(`Found ${registrations.length} registrations to update`);
    
    // Update each registration one by one without using a transaction
    const updatedRegistrations = [];
    const errors = [];
    
    for (const reg of registrations) {
      try {
        const newDueAmount = Math.max(0, parseFloat(totalAmount) - reg.paidAmount);
        
        const updated = await prisma.tourRegistration.update({
          where: { id: reg.id },
          data: {
            totalAmount: parseFloat(totalAmount),
            dueAmount: newDueAmount
          }
        });
        
        updatedRegistrations.push(updated);
        console.log(`Updated registration ID: ${reg.id}`);
      } catch (updateError) {
        console.error(`Error updating registration ID: ${reg.id}`, updateError);
        errors.push({ id: reg.id, error: updateError.message });
      }
    }
    
    console.log(`Successfully updated ${updatedRegistrations.length} out of ${registrations.length} registrations`);
    
    if (errors.length > 0) {
      return NextResponse.json({ 
        warning: `${updatedRegistrations.length} updated, ${errors.length} failed`, 
        errors 
      }, { status: 207 });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `All ${updatedRegistrations.length} registrations updated successfully` 
    });
    
  } catch (error) {
    console.error('Error updating all amounts:', error);
    return NextResponse.json({ error: `Failed to update amounts: ${error.message}` }, { status: 500 });
  }
} 