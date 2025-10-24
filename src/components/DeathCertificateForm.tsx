import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface DeathData {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: string;
  deathDate: string;
  deathPlace: string;
  deathCause: string;
  citizenship: string;
  lastAddress: string;
  registrationDate: string;
  registrationPlace: string;
  applicantName: string;
  applicantRelation: string;
}

export const DeathCertificateForm = ({ onSave }: { onSave: () => void }) => {
  const [formData, setFormData] = useState<DeathData>({
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    deathDate: '',
    deathPlace: '',
    deathCause: '',
    citizenship: 'Российская Федерация',
    lastAddress: '',
    registrationDate: '',
    registrationPlace: '',
    applicantName: '',
    applicantRelation: '',
  });

  const handleChange = (field: keyof DeathData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.lastName || !formData.firstName || !formData.deathDate) {
      toast.error('Заполните обязательные поля');
      return;
    }
    onSave();
    toast.success('Свидетельство о смерти сохранено');
  };

  const handlePrint = () => {
    window.print();
    toast.info('Документ отправлен на печать');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения об умершем</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Фамилия *</Label>
            <Input 
              value={formData.lastName} 
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Имя *</Label>
            <Input 
              value={formData.firstName} 
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Отчество</Label>
            <Input 
              value={formData.middleName} 
              onChange={(e) => handleChange('middleName', e.target.value)}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Дата рождения</Label>
            <Input 
              type="date" 
              value={formData.birthDate} 
              onChange={(e) => handleChange('birthDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Гражданство</Label>
            <Input 
              value={formData.citizenship} 
              onChange={(e) => handleChange('citizenship', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Последнее место жительства</Label>
          <Input 
            value={formData.lastAddress} 
            onChange={(e) => handleChange('lastAddress', e.target.value)}
            placeholder="Адрес регистрации"
          />
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о смерти</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата смерти *</Label>
            <Input 
              type="date" 
              value={formData.deathDate} 
              onChange={(e) => handleChange('deathDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место смерти</Label>
            <Input 
              value={formData.deathPlace} 
              onChange={(e) => handleChange('deathPlace', e.target.value)}
              placeholder="г. Москва, ул. ..."
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label>Причина смерти</Label>
          <Textarea 
            value={formData.deathCause} 
            onChange={(e) => handleChange('deathCause', e.target.value)}
            placeholder="На основании медицинского свидетельства"
            rows={3}
          />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о заявителе</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>ФИО заявителя</Label>
            <Input 
              value={formData.applicantName} 
              onChange={(e) => handleChange('applicantName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Степень родства</Label>
            <Input 
              value={formData.applicantRelation} 
              onChange={(e) => handleChange('applicantRelation', e.target.value)}
              placeholder="Сын, супруг(а), и т.д."
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
        <h3 className="font-semibold text-sm mb-2">Сведения о регистрации</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Дата регистрации</Label>
            <Input 
              type="date" 
              value={formData.registrationDate} 
              onChange={(e) => handleChange('registrationDate', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Место регистрации</Label>
            <Input 
              value={formData.registrationPlace} 
              onChange={(e) => handleChange('registrationPlace', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button onClick={handleSave} className="gap-2">
          <Icon name="Save" size={16} />
          Сохранить
        </Button>
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <Icon name="Printer" size={16} />
          Печать на бланк
        </Button>
        <Button variant="outline" className="gap-2">
          <Icon name="FileCheck" size={16} />
          Отправить на проверку
        </Button>
      </div>
    </div>
  );
};
