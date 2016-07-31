import {Accordion} from './Accordion.jsx';

const questions = [
  {
    question: 'What is cheapest option for my wristbands?',
    answer: 'Printing and Debossed wristbands is better choice if you have tight budget. Of course , ' +
    'the bigger quantity you order , the lower price you will get. More than 5000 pc , you will get' +
    ' the lowest price from us.'
  },
  {
    question: 'Can I have the samples to check the quality?',
    answer: 'Yes , it will takes 5 to 7 business days by USPS delivery. Free samples.'
  },
  {
    question: 'Can I put my custom logo on the wristbands , and how much?',
    answer: 'Yes , uploading it online or send us by email. We will help you put it on the preview artwork ' +
    'of your wristbands and show you before the production. And for FREE !'
  },
  {
    question: 'Do you have glowing wristbands?',
    answer: 'Yes, we do. However only a few colors will glow in the dark well, like white , light yellow, ' +
    'neon green. So consult our sales by email or phone call to get more details to set up your order.'
  },
  {
    question: 'What size is suitable for me?',
    answer: 'We have adult , youth and child size. Adult size is for 8 inch .Youth size is for 7 inch. Child size is ' +
    'for 6.5 inch. XL size is for special customized , approx 9 inch , leaving us this sizes requirement in the ' +
    'comment box when you placed the order. We will review it and offer you the FREE ARTWROK.'
  },
  {
    question: 'How much for the shipping fees?',
    answer: 'We have very easy way on the price cause production price and shipping fees is all included. Added 15% ' +
    'more to speed up the orders as 7 business days arrival. Added 5% more to speed it up as 4 business days arrival.'
  },
  {
    question: 'Purchase order',
    answer: 'Sending us a check pls include a copy of your order number along with the check. Email us the Purchase' +
    ' order to Sales@popwristbands.com with your order number. The sales team will send you a proof or artwork ' +
    'to confirm the details. Your order will go under production once the payment and proof is approved.'
  },
  {
    question: 'Shipping method',
    answer: 'Because all the wristbands ,even from other wristbands company , is producted from China. We only ' +
    'have lasering and printing part in USA, but the blank wristbands is from China. This is true story of ' +
    'wristbands. Made in USA , cost you much more , which is totally lie and excuse to charge you more. We use ' +
    'USPS, UPS DHL, and Fedex. Track will be offered once it is shipped out.'
  },
  {
    question: 'Payment methods',
    answer: ' Credit Card , Paypal, Checks, Money Orders, and Bank Wire Transfers. We accept the USD dollars.'
  },
  {
    question: 'Refund',
    answer: 'Deadline missing , we will refund fully you in 3 business days , depends on the method you paid. Bad ' +
    'quality, then you can take refund or remake the product in 4 business days. Order only can be canceled in 6 ' +
    'hours , after that you only get 50% money back.'
  }
];

let i = 0;

const styles = {
  header: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#000',
    lineHeight: '22px',
    padding: '30px 0 15px',
    cursor: 'pointer',
    borderBottom: '2px solid #c0c1c0'
  }
};

export const PopularQuestions = () => <div>
  <h2 style={{color: '#2dafca', fontSize: '28px', fontWeight: 600}}>Popular questions</h2>

  {(questions.map((q) => {
    const header = <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div>
        {q.question}
      </div>
      <div>
        <img src={'./images/icon-plus.png'} style={{width: '13px', height: '13px'}}/>
      </div>
    </div>;
    return <Accordion styleHeader={styles.header} styleContent={{margin: '10px 5px', textAlign: 'justify'}} key={++i}
                      headerClose={header}>{q.answer}</Accordion>;
  }))}
</div>;
