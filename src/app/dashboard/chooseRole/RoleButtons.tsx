'use client'
import { Button } from '@/components/ui/button';

type setRole = (role:string) => void;

const RoleButtons = function({setRole}:{setRole:setRole}) {
  'use client'
  return (
  <div className='flex flex-row w-full justify-around gap-5'>
  <Button className="bg-brand-cta text-white flex-1" onClick={()=>setRole('owner')}>Owner</Button>
  <Button className="bg-brand-cta text-white flex-1" onClick={()=>setRole('sitter')}>Sitter</Button>
</div>
  )
}

export default RoleButtons